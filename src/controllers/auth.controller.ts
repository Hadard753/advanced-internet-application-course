import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';

import User, { UserDocument } from "../models/user.model";

const saltRounds = 10;

const sendError = (res: Response, code: number, message: string) => {
    res.status(code).send({
        status: `fail`,
        message
    })
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log("login");
    sendError(res, 400, 'not implemented')
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

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