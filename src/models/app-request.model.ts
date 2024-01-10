import { Request } from 'express';
import { UserDocument } from './user.model';

export interface AppRequest extends Request {
    user?: UserDocument
}