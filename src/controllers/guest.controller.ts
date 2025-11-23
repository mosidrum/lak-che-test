import {Request, Response} from 'express';
import {GuestRepository, OtpRepository, PropertyRepository} from "../repository";
import {BadRequestError} from "../lib";
import {otpGenerator} from "../utils";
import {OtpStatus} from "../entities";

export const sendCodeToConfirmGuest = async (req: Request, res: Response) => {
    const propertyRepository = new PropertyRepository();
    const guestRepository = new GuestRepository();
    const otpRepository = new OtpRepository();

    const { ssn, phoneNumber, propertyId } = req.body;

    const propertyToLet = await propertyRepository.findOne({
        where: { id: propertyId, isAvailable: true }
    });
    if (!propertyToLet) throw new BadRequestError('This property is not available for letting');

    let guest = await guestRepository.findOne({ where: { ssn } });

    if (!guest) {
        guest = guestRepository.create({
            ssn,
            phoneNumber,
            property: propertyToLet
        });
        await guestRepository.save(guest);
    } else if (!guest.property) {
        guest.property = propertyToLet;
        await guestRepository.save(guest);
    }

    const code = otpGenerator();

    const otp = otpRepository.create({
        code,
        guest,
        status: OtpStatus.UNUSED,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await otpRepository.save(otp);

    res.status(200).json({
        message: 'OTP generated successfully',
        data: {
            guestId: guest.id,
            code
        }
    });
};
