import Supertest from 'supertest';
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import StatusCodes from 'http-status-codes';

import app from '@server';
import User from '@daos/UserDao';
import { headerProps } from '@shared/constants';

const EXISTING_NAME = 'John Test';
const EXISTING_EMAIL = 'test@example.com';
const EXISTING_PASSWORD = 'aVEryNicePassWord33';

const existingLoginCredentials = {
    email: EXISTING_EMAIL,
    password: EXISTING_PASSWORD,
};

let mongoDb: MongoMemoryServer;

describe('UserRouter', () => {

    const authPath = '/api/auth';
    const loginPath = `${authPath}/login`;

    const createLinkPath = `/api/links/create`;

    const { OK, UNAUTHORIZED, BAD_REQUEST } = StatusCodes;

    beforeAll(async () => {

        mongoDb = await MongoMemoryServer.create();

        const uri = mongoDb.getUri();

        await mongoose.connect(uri);

        const user = new User({
            email: EXISTING_EMAIL,
            password: EXISTING_PASSWORD,
            name: EXISTING_NAME
        });

        await user.save();
    });

    afterAll(async () => {
        // Fetch all collections in use.
        const collections = await mongoose.connection.db.collections();

        try {
            for (const collection of collections) {
                await collection.deleteMany({});
            }
        } catch(e) {
            // Dropping all collections can cause potential issues.
            // with defaults.
        }

        await mongoose.connection.close();

        await mongoDb.stop();
    });

    describe(`"POST:${loginPath}"`, () => {
        it(`should return a response with a status of ${UNAUTHORIZED}`,
            (done) => {
                const creds = {
                    email: 'example@gmail.com',
                    password: 'adecentpasswordhere',
                };

                Supertest(app)
                    .post(loginPath).send(creds)
                    .then((response: Supertest.Response) => {
                        expect(response.status).toBe(UNAUTHORIZED);
                        expect(response.headers[headerProps.key]).toBeFalsy();
                        done();
                    })
            });
    });

    describe(`"POST:${loginPath}"`, () => {
        it(`should return a response with a status of ${OK} with a JWT body response`,
            (done) => {
                Supertest(app)
                    .post(loginPath).send(existingLoginCredentials)
                    .then((response: Supertest.Response) => {
                        expect(response.status).toBe(OK);
                        expect(response.body["jwt"]).toBeTruthy();
                        done();
                    })
            });
    });

    describe(`"POST:${createLinkPath}"`, () => {
        it(`should login and then use session to create link`,
            async () => {
                const loginReq = await Supertest(app)
                    .post(loginPath).send(existingLoginCredentials);

                const jwt = loginReq.body["jwt"];

                expect("jwt").toBeTruthy();

                await Supertest(app)
                    .post(createLinkPath).send({ "url": "https://google.com" }).expect(OK);

            });
    });

    describe(`"POST:${createLinkPath}"`, () => {
        it(`should login and then use session to create a bad link`,
            async () => {
                await Supertest(app)
                    .post(loginPath).send(existingLoginCredentials);

                await Supertest(app)
                    .post(createLinkPath).send({ "url": "httgrgoogleg/p4m" }).expect(BAD_REQUEST);

            });
    });
});

