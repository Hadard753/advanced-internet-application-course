import express, { Router } from 'express';
import * as auth from "../controllers/auth.controller";

const authRouter: Router = express.Router();

authRouter.post('/register', auth.register);
authRouter.post('/login', auth.login);
authRouter.post('/logout', auth.logout);

export { authRouter };
