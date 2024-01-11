// models/Comment.ts

import mongoose, { Schema, Document, Types } from 'mongoose';
import { ImageDocument } from './image.model';

export interface CommentDocument extends Document {
  breedType: string;
  content: string;
  img?: ImageDocument['_id'];
  author: Types.ObjectId; 
}

const commentSchema: Schema<CommentDocument> = new Schema({
  breedType: { type: String, required: true },
  content: { type: String, required: true },
  img: { type: Schema.Types.ObjectId, ref: 'Image' },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to User model
});

const Comment = mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;
