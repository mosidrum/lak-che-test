import { Request, Response } from 'express';
import {BadRequestError, BcryptHelper, HTTP_STATUS, JwtHelper, JwtPayload} from "../lib";
import {UserRepository} from "../repository";

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

