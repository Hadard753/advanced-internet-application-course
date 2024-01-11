// __tests__/auth.test.ts

import request from 'supertest';
import appPromise from '../app';
import mongoose from 'mongoose';
import mongoTestServer from '../testdb';

beforeAll(done => {
    done();
})

afterAll(done => {
    mongoose.connection.close();
    mongoTestServer.stop();
    done();
})

describe("Restrict access without Auth", () => {
    test("It should response wth Unauthorized error", async () => {
        const app = await appPromise;
        const response = await request(app).get("/comments/");

        expect(response.statusCode).toEqual(401);
        expect(response.body?.message).toEqual('Unauthorized - No token provided');
    })
});