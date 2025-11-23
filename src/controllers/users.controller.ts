import { Request, Response } from 'express';
import {BadRequestError, BcryptHelper, HTTP_STATUS, JwtHelper, JwtPayload} from "../lib";
import {AccessPinRepository, DoorRepository, GuestRepository, PropertyRepository, UserRepository} from "../repository";
import {IExtendedRequest} from "../middleware";
import QRCode from "qrcode";
import {pinGenerator} from "../utils";

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

    const qrCodeData = JSON.stringify({
        propertyName: name,
        address,
        ownerId,
        timestamp: new Date().toISOString()
    });

    let qrCode: string;
    try {
        qrCode = await QRCode.toDataURL(qrCodeData);
    } catch {
        throw new BadRequestError('Failed to generate QR code');
    }

    const newProperty = propertyRepository.create({
        name,
        address,
        image,
        qrCode,
        owner
    });

    const savedProperty = await propertyRepository.save(newProperty);

    const newDoor = doorRepository.create({
        name: doorName || 'Main Garage Door',
        lockId: `LOCK-${Date.now()}`,
        property: savedProperty,
    });

    const savedDoor = await doorRepository.save(newDoor);

    savedProperty.door = savedDoor;
    await propertyRepository.save(savedProperty);

    res.status(HTTP_STATUS.CREATED).json({
        message: 'Property and door created successfully',
        data: {
            property: {
                id: savedProperty.id,
                name: savedProperty.name,
                address: savedProperty.address,
                image: savedProperty.image,
                qrCode: savedProperty.qrCode,
                isAvailable: savedProperty.isAvailable,
                owner: {
                    id: owner.id,
                    name: owner.name,
                    email: owner.email
                },
                door: {
                    id: savedDoor.id,
                    name: savedDoor.name,
                    lockId: savedDoor.lockId
                }
            }
        }
    });
};

export const approveLetting = async (req: IExtendedRequest, res: Response) => {
    const { propertyId, guestId } = req.body;
    const { user } = req;

    const propertyRepo = new PropertyRepository();
    const guestRepo = new GuestRepository();
    const pinRepo = new AccessPinRepository();

    const property = await propertyRepo.findOne({
        where: {
            id: propertyId,
            owner: { id: user.id }
        }
    });

    if (!property) throw new BadRequestError('Property not found');
    if (!property.isAvailable) throw new BadRequestError('Property already occupied');

    const guest = await guestRepo.findOne({
        where: { id: guestId }
    });

    if (!guest) throw new BadRequestError('Guest not found');

    const door = property.door;

    if (!door) throw new BadRequestError('No door attached to this property');

    const pinCode = pinGenerator();

    const validFrom = new Date();
    const validUntil = new Date(Date.now() + 5 * 60 * 1000);

    const accessPin = pinRepo.create({
        pinCode,
        property,
        guest,
        door,
        validFrom,
        validUntil,
        status: 'ACTIVE'
    });

    await pinRepo.save(accessPin);

    property.isAvailable = false;
    await propertyRepo.save(property);

    return res.status(200).json({
        message: 'Property approved and access pin generated',
        pin: pinCode,
        validUntil
    });
};

