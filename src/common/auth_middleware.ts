// authMiddleware.ts

import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AppRequest } from '../models/app-request.model';
import User from '../models/user.model';

const authenticateJWT = async (req: AppRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization') || req.header('authorization')
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || "", async (err: any, jwtUser: any) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        const user = await User.findById(jwtUser.userId);
        if (!user) {
            return res.status(403).json({ message: 'Forbidden - User not exist' });
        }
        req.user = user;
        next();
    });
};

export default authenticateJWT;
