import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';

import userRoutes from './routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! My name is Dayan');
});

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
