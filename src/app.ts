import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as core from "express-serve-static-core";

import { userRouter, commentRouter, authRouter } from './routes';
import { connectMongo } from './db';

dotenv.config();

const appPromise: Promise<core.Express> = new Promise((resolve, reject) => {
  connectMongo().then(() => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/comments', commentRouter);

    resolve(app);
  }).catch(error => {
    console.error(`Error initializing the app: ${error}`)
    reject(error);
  });
});

export default appPromise;