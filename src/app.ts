import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRoutes from './routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
console.log(`connecting mongo db`);
mongoose.connect('mongodb://127.0.0.1:27017/test');


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! My name is Dayan');
});

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
