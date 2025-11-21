import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { handleGetRepository, UserEntity, UserRole } from '../entities';
import { BadRequestError, HTTP_STATUS } from '../lib';

const SALT_ROUNDS = 10;

export const sanitizeUser = (user: UserEntity) => {
    const { password, ...rest } = user;
    return rest;
};

export const createUser = async (req: Request, res: Response) => {
    const {
        fullName,
        email,
        phone,
        password,
        role = UserRole.RENTER
    } = req.body;

    const userRepository = handleGetRepository(UserEntity);

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
        role
    });
    const savedUser = await userRepository.save(newUser);

    const response = {
        message: 'User created successfully',
        data: sanitizeUser(savedUser)
    };

    res.status(HTTP_STATUS.CREATED).send(response);
};

