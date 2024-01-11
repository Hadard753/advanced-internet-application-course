// models/User.ts

import mongoose, { Schema, Document, Types } from 'mongoose';
import { CommentDocument } from './comment.model';

export interface UserDocument extends Document {
  username: string;
  password: string;
  tokens: string[];
  comments: Types.Array<CommentDocument['_id']>;
}

const userSchema: Schema<UserDocument> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{ type: String, ref: 'Comment' }],
  comments: [String],
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
