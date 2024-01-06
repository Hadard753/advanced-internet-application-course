import express, { Router, Request, Response } from 'express';

const userRouter: Router = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  res.send('User route is working!');
});

userRouter.post('/', (req: Request, res: Response) => {
  res.send('User route is working!');
});

userRouter.put('/login', (req: Request, res: Response) => {
  res.send('User route is working!');
});

export { userRouter };
