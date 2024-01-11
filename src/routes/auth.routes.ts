import express, { Router } from 'express';
import * as Auth from "../controllers/auth.controller";

const authRouter: Router = express.Router();

authRouter.post('/register', Auth.register);
authRouter.post('/login', Auth.login);
authRouter.post('/logout', Auth.logout);
authRouter.post('/refreshToken', Auth.refreshToken);

export { authRouter };
