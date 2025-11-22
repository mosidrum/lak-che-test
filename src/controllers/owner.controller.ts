import {IExtendedRequest} from "../middleware";
import { Response } from 'express';
import { BadRequestError, HTTP_STATUS } from '../lib';
import { PropertyRepository, UserRepository } from '../repository';
import QRCode from 'qrcode';

export const addProperty = async (req: IExtendedRequest, res: Response) => {
    const { name, address, image } = req.body;
    const ownerId = req.user.id;

    const userRepository = new UserRepository();
    const propertyRepository = new PropertyRepository();

    const owner = await userRepository.findById(ownerId);
    if (!owner) {
        throw new BadRequestError('Owner not found');
    }

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

    res.status(HTTP_STATUS.CREATED).json({
        message: 'Property created successfully',
        data: {
            property: {
                id: savedProperty.id,
                name: savedProperty.name,
                address: savedProperty.address,
                image: savedProperty.image,
                qrCode: savedProperty.qrCode,
                owner: {
                    id: owner.id,
                    name: owner.name,
                    email: owner.email
                }
            }
        }
    });
};
