import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { handleGetRepository, UserEntity } from '../entities';
import { BadRequestError, HTTP_STATUS, UnauthorizedError } from '../lib';
import { sanitizeUser } from './user-controller';

const SALT_ROUNDS = 10;

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


