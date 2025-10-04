import { Request, Response } from 'express';
import { handleGetRepository, UserEntity } from '../entities';
import { BadRequestError, HTTP_STATUS } from '../lib';

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const userRepository = handleGetRepository(UserEntity);

    const user= await userRepository.findOne({ where: { email } });

    if (user) {
        throw new BadRequestError('A user with this email already exists');
    }

    const newUser = userRepository.create({ name, email });
    await userRepository.save(newUser);

    const response = {
        message: 'User created successfully',
        data: newUser
    };

    res.status(HTTP_STATUS.CREATED).send(response);
};
