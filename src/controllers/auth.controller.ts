import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { UserDocument } from "../models/user.model";

const saltRounds = 10;

const sendError = (res: Response, code: number, message: string): void => {
    res.status(code).send({
        status: `fail`,
        message
    })
}

const generateTokens = (user: UserDocument): { accessToken: string, refreshToken: string } => {
    const accessToken = jwt.sign(
        { __id: user._id }, 
        process.env.ACCESS_TOKEN_SECRET || "", 
        { expiresIn: process.env.JWT_TOKEN_EXPIRATION || '1h' }
    );
    const refreshToken = jwt.sign(
        { __id: user._id }, 
        process.env.REFRESH_TOKEN_SECRET || "",
    );

    return {accessToken, refreshToken};
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, 'Invalid credentials');
        }

        const user: UserDocument | null = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return sendError(res, 401, 'Invalid password')
        }

        const { accessToken, refreshToken } = generateTokens(user);

        if (user.tokens == null) user.tokens = [refreshToken]
        else user.tokens.push(refreshToken)

        await user.save();

        return res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
        // Handle any errors that occur during the login process
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) sendError(res, 402, 'invalid email or password');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return sendError(res, 400, 'User already registered');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser: UserDocument = new User({
        email,
        password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization') || req.header('authorization')
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "", async (err: any, jwtUser: any) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }
        try {
            const user = await User.findById(jwtUser.__id);
            if (!user) {
                return res.status(403).json({ message: 'Forbidden - User not exist' });
            }
            if(!user.tokens?.includes(token)) {
                user.tokens = []; // deactivate all refresh tokens
                await user.save();
                return res.status(403).json({ message: 'Forbidden - Invalid request' });
            }
            
            user.tokens.splice(user.tokens.indexOf(token), 1);
            await user.save();
            return res.status(200).json({ message: 'Logged out' });   
        } catch (error) {
            return sendError(res, 500, "Internal server error");
        }
    });
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization') || req.header('authorization')
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "", async (err: any, jwtUser: any) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }
        try {
            const user = await User.findById(jwtUser.__id);
            if (!user) {
                return res.status(403).json({ message: 'Forbidden - User not exist' });
            }
            if(!user.tokens?.includes(token)) {
                user.tokens = []; // deactivate all refresh tokens
                await user.save();
                return res.status(403).json({ message: 'Forbidden - Invalid request' });
            }
    
            const { accessToken, refreshToken } = generateTokens(user);
            
            user.tokens[user.tokens.indexOf(refreshToken)] = refreshToken;
            await user.save();
            return res.status(200).json({ message: 'Token refreshed', accessToken, refreshToken });   
        } catch (error) {
            return sendError(res, 500, "Internal server error");
        }
    });
}