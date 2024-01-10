import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { UserDocument } from "../models/user.model";

const saltRounds = 10;

const sendError = (res: Response, code: number, message: string) => {
    res.status(code).send({
        status: `fail`,
        message
    })
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;

        if (!username || !password) {
            return sendError(res, 400, 'Invalid credentials');
        }

        const user: UserDocument | null = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return sendError(res, 401, 'Invalid password')
        }

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET || "", 
            { expiresIn: process.env.JWT_TOKEN_EXPIRATION || '1h' }
        );

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        // Handle any errors that occur during the login process
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) sendError(res, 402, 'invalid username or password');

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return sendError(res, 400, 'User already registered');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser: UserDocument = new User({
        username,
        password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    console.log("logout");
    sendError(res, 400, 'not implemented')
}