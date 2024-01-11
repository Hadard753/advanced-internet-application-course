import express, { Router, Request, Response } from 'express';
import authenticateJWT from '../common/auth_middleware';

const commentRouter: Router = express.Router();

commentRouter.get('/', authenticateJWT, (req: Request, res: Response) => {
  res.send('Comments route is working!');
});

export { commentRouter };
