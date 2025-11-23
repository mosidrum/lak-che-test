import { Request, Response } from 'express';
import {GuestRepository, OtpRepository, PropertyRepository} from "../repository";
import {BadRequestError} from "../lib";
import {generator} from "../utils";

export const sendCodeToConfirmGuest = async (req: Request, res: Response) => {
    const propertyRepository = new PropertyRepository();
    const guestRepository = new GuestRepository();
    const otpRepository = new OtpRepository();

    const { ssn, phoneNumber, propertyId } = req.body;

    const propertyToLet = await propertyRepository.find({ where : {id: propertyId, isAvailable: true} })
    if(!propertyToLet) throw new BadRequestError('This property is not available for letting');
    const guest = await guestRepository.findOne({ where: { ssn } });
    if (!guest) {
        const newGuest = guestRepository.create({
            ssn,
            phoneNumber
        });
        await guestRepository.save(newGuest);
    }

    const code = generator();

    const otp = otpRepository.create({
        code,
        guest,
        status: 'UNUSED',
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await otpRepository.save(otp);

    res.status(200).json({
        message: 'Otp generated successfully',
        data: {
            guestId: guest.id, code
        }
    });

}
