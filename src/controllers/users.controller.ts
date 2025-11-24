import {Request, Response} from 'express';
import {BadRequestError, BcryptHelper, HTTP_STATUS, JwtHelper, JwtPayload} from "../lib";
import {AccessPinRepository, DoorRepository, GuestRepository, PropertyRepository, UserRepository} from "../repository";
import {IExtendedRequest} from "../middleware";
import QRCode from "qrcode";
import {pinGenerator} from "../utils";
import { SeamService, sendWhatsAppMessage} from "../services";
import AppDataSource from "../database/data-source";
import { v4 as uuidv4 } from 'uuid';

const seamService = new SeamService();


export const register = async (req: Request, res: Response) => {
    const { name, email, password, phoneNumber } = req.body;
    const userRepository = new UserRepository();

    const user = await userRepository.findOne({ where: { email } });

    if (user) {
        throw new BadRequestError('A user with this email address already exists');
    }

    const hashedPassword = await BcryptHelper.hash(password);
    const newUser = userRepository.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        role: 'OWNER'
    });

    await userRepository.save(newUser);

    const responseData: JwtPayload = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };

    const token = JwtHelper.generateToken(responseData);

    res
      .status(HTTP_STATUS.CREATED)
      .send({ message: 'User created successfully', token, data: responseData });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = new UserRepository();

    const user = await userRepository.findOne({ where: { email } });

    const isUserPasswordValid = user ? await BcryptHelper.compare(password, user.password) : false;

    if (!user || !isUserPasswordValid) {
        throw new BadRequestError('Invalid email or password');
    }

    const response: JwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    const token = JwtHelper.generateToken(response);

    res.status(HTTP_STATUS.OK).json({
        message: 'Login successful',
        token,
        data: response
    });
};

export const addProperty = async (req: IExtendedRequest, res: Response) => {
    const { name, address, image, doorName } = req.body;
    const ownerId = req.user.id;

    const userRepository = new UserRepository();
    const propertyRepository = new PropertyRepository();
    const doorRepository = new DoorRepository();

    const owner = await userRepository.findById(ownerId);
    if (!owner) throw new BadRequestError('Owner not found');

    const { savedProperty, savedDoor } = await AppDataSource.transaction(async (manager) => {
        const newProperty = propertyRepository.create({ name, address, image, owner });
        const savedProperty = await manager.save(newProperty);

        const qrCodeData = JSON.stringify({
            propertyId: savedProperty.id,
            propertyName: name,
            address,
            ownerId,
            timestamp: new Date().toISOString()
        });
        savedProperty.qrCode = await QRCode.toDataURL(qrCodeData);
        await manager.save(savedProperty);

        const newDoor = doorRepository.create({
            name: doorName || 'Main Garage Door',
            lockId: `LOCK-${uuidv4()}`,
            property: savedProperty
        });
        const savedDoor = await manager.save(newDoor);

        savedProperty.door = savedDoor;
        await manager.save(savedProperty);

        return { savedProperty, savedDoor };
    });

    res.status(HTTP_STATUS.CREATED).json({
        message: 'Property and door created successfully',
        data: {
            property: {
                id: savedProperty.id,
                name: savedProperty.name,
                address: savedProperty.address,
                image: savedProperty.image,
                qrCode: savedProperty.qrCode,
                owner: { id: owner.id, name: owner.name, email: owner.email },
                door: { id: savedDoor.id, name: savedDoor.name, lockId: savedDoor.lockId }
            }
        }
    });
};

export const addGuestToProperty = async (req: IExtendedRequest, res: Response) => {
    const { propertyId, phoneNumber, ssn } = req.body;
    if (!propertyId || !phoneNumber) throw new BadRequestError('propertyId and phoneNumber are required');

    const propertyRepository = new PropertyRepository();
    const guestRepository = new GuestRepository();

    const property = await propertyRepository.findOne({
        where: { id: propertyId },
        relations: ['door']
    });
    if (!property) throw new BadRequestError('Property not found');

    let guest = await guestRepository.findOne({
        where: { phoneNumber, property: { id: propertyId } },
        relations: ['property']
    });

    if (!guest) {
        guest = guestRepository.create({ phoneNumber, property, ssn });
        guest = await guestRepository.save(guest);
    }

    const seamCodes =
      property.door?.lockId
          ? await seamService.listAccessCodes(property.door.lockId)
          : [];

    res.status(HTTP_STATUS.CREATED).json({
        message: 'Guest added to property successfully',
        data: {
            guest: { id: guest.id, phoneNumber: guest.phoneNumber },
            seamAccessCodes: seamCodes
        }
    });
};

export const approveGuest = async (req: IExtendedRequest, res: Response) => {
    const { propertyId, phoneNumber } = req.body;
    const ownerId = req.user.id;

    await AppDataSource.transaction(async () => {
        const propertyRepo = new PropertyRepository();
        const guestRepo = new GuestRepository();
        const pinRepo = new AccessPinRepository();

        const property = await propertyRepo.findOne({
            where: { id: propertyId, owner: { id: ownerId } },
            relations: ['door']
        });

        if (!property) throw new BadRequestError('Property not found or not owned by you');

        const door = property.door;
        if (!door) throw new BadRequestError('No door attached to this property');
        if (!door.lockId) throw new BadRequestError('Door is not linked to a Seam device');

        const guest = await guestRepo.findOne({
            where: { phoneNumber, property: { id: propertyId } },
            relations: ['property']
        });

        if (!guest) {
            if (!phoneNumber) {
                throw new BadRequestError('Phone number required to initiate verification call');
            }

            await sendWhatsAppMessage(
              phoneNumber,
              'You are being verified. Please tap the call button to speak with the property owner.'
            );

            res.status(200).json({
                message: 'Guest not found. Guest prompted to make a call to owner.',
            });

            return;
        }


        await pinRepo.update(
          { door: { id: door.id }, status: 'ACTIVE' },
          { status: 'EXPIRED' }
        );

        const validFrom = new Date();
        const validUntil = new Date(Date.now() + 5 * 60 * 1000);

        const seamAccessCode = await seamService.createAccessCode({
            deviceId: door.lockId,
            name: `${guest.phoneNumber}-${property.name}`,
            startsAt: validFrom.toISOString(),
            endsAt: validUntil.toISOString()
        });

        const pinCode = seamAccessCode.code ?? pinGenerator();

        const accessPin = pinRepo.create({
            pinCode,
            property,
            guest,
            door,
            validFrom,
            validUntil,
            status: 'ACTIVE',
            seamAccessCodeId: seamAccessCode.access_code_id
        });

        await pinRepo.save(accessPin);

        const message = `✅ Access Approved!
Property: ${property.name}
PIN: ${pinCode}
Expires: ${validUntil.toLocaleTimeString()}`;

        await sendWhatsAppMessage(guest.phoneNumber, message);

        res.status(200).json({
            message: 'Guest approved and access PIN generated',
            data: { pin: pinCode, validUntil, seamAccessCodeId: seamAccessCode.access_code_id }
        });
    });
};
