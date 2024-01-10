// models/Image.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ImageDocument extends Document {
  filename: string;
  path: string;
  createdAt: Date;
}

const imageSchema: Schema<ImageDocument> = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Default value set to the current date and time
});

const Image = mongoose.model<ImageDocument>('Image', imageSchema);

export default Image;
