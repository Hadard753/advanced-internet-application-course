import express, { Router, Request, Response } from 'express';

const commentRouter: Router = express.Router();

commentRouter.get('/', (req: Request, res: Response) => {
  res.send('Comments route is working!');
});

export { commentRouter };
