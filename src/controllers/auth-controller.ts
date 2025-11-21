import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { handleGetRepository, EmailVerificationEntity, UserEntity, UserRole } from '../entities';
import { BadRequestError, HTTP_STATUS, UnauthorizedError } from '../lib';
import { sanitizeUser } from './user-controller';
import { generateOtp, sendEmail } from '../services';

const SALT_ROUNDS = 10;
const VERIFICATION_TOKEN_TTL_MINUTES = 30;

const buildVerificationMessage = (otp: string, fullName: string) => {
    return [
        `Hello ${fullName},`,
        '',
        'Thanks for registering with AutoFi Rentals.',
        `Your verification code is: ${otp}`,
        '',
        'Enter this code in the app within the next 30 minutes to verify your email.'
    ].join('\n');
};

export const registerUser = async (req: Request, res: Response) => {
    const { fullName, email, phone, password } = req.body;

    const userRepository = handleGetRepository(UserEntity);
    const verificationRepository = handleGetRepository(EmailVerificationEntity);

    const existingUser = await userRepository.findOne({
        where: [{ email }, { phone }]
    });

    if (existingUser) {
        throw new BadRequestError('A user with this email or phone already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = userRepository.create({
        fullName,
        email,
        phone,
        password: hashedPassword,
        role: UserRole.RENTAL_USER,
        isEmailVerified: false,
        isApproved: false
    });

    const savedUser = await userRepository.save(newUser);

    const otp = generateOtp();
    const verificationRecord = verificationRepository.create({
        user: savedUser,
        token: otp,
        expiresAt: new Date(Date.now() + VERIFICATION_TOKEN_TTL_MINUTES * 60 * 1000),
        usedAt: null
    });

    await verificationRepository.save(verificationRecord);
    await sendEmail({
        to: savedUser.email,
        subject: 'Verify your AutoFi Rentals email',
        body: buildVerificationMessage(otp, savedUser.fullName)
    });

    res.status(HTTP_STATUS.CREATED).send({
        message: 'Registration successful. Please verify your email.',
        data: sanitizeUser(savedUser)
    });
};

export const verifyEmail = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const userRepository = handleGetRepository(UserEntity);
    const verificationRepository = handleGetRepository(EmailVerificationEntity);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        throw new BadRequestError('User not found');
    }

    if (user.isEmailVerified) {
        return res.status(HTTP_STATUS.OK).send({
            message: 'Email already verified',
            data: sanitizeUser(user)
        });
    }

    const verificationRecord = await verificationRepository.findOne({
        where: {
            user: { id: user.id },
            token: otp,
            usedAt: null
        },
        relations: {
            user: true
        }
    });

    if (!verificationRecord) {
        throw new BadRequestError('Invalid verification code');
    }

    const now = new Date();
    if (verificationRecord.expiresAt.getTime() < now.getTime()) {
        throw new BadRequestError('Verification code has expired');
    }

    user.isEmailVerified = true;
    verificationRecord.usedAt = now;

    await userRepository.save(user);
    await verificationRepository.save(verificationRecord);

    res.status(HTTP_STATUS.OK).send({
        message: 'Email verified successfully',
        data: sanitizeUser(user)
    });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = handleGetRepository(UserEntity);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new UnauthorizedError('Invalid email or password');
    }

    if (user.isSuspended) {
        throw new UnauthorizedError('Your account has been suspended. Contact support.');
    }

    res.status(HTTP_STATUS.OK).send({
        message: 'Login successful',
        data: sanitizeUser(user)
    });
};

export const changePassword = async (req: Request, res: Response) => {
    const { email, currentPassword, newPassword } = req.body;
    const userRepository = handleGetRepository(UserEntity);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        throw new BadRequestError('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordMatch) {
        throw new UnauthorizedError('Current password is incorrect');
    }

    if (currentPassword === newPassword) {
        throw new BadRequestError('New password must be different from the current password');
    }

    user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await userRepository.save(user);

    res.status(HTTP_STATUS.OK).send({
        message: 'Password updated successfully'
    });
};


