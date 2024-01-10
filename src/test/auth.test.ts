// __tests__/auth.test.ts

import request from 'supertest';
import appPromise from '../app';
import mongoose from 'mongoose';


beforeAll(done => {
    done();
})

afterAll(done => {
    mongoose.connection.close();
    done();
})

describe("GET /", () => {
    test("It should response User route is working!", async () => {
        const app = await appPromise;
        const response = await request(app).get("/users/");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual("User route is working!");
    })
});