import supertest from "supertest";
import createServer from "../config/server";
import * as UserController from "../controllers/UserController";
import {userInput, userPayload} from "./data";

const app = createServer();

describe("user", () => {
    describe("registration", () => {
        describe("given the user controller throws", () => {
            it("return error 500", async () => {
                const createUserControllerMock = jest
                    .spyOn(UserController, "register")
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);

                const { statusCode } = await supertest(createServer())
                    .post("/api/auth/register")
                    .send(userInput);

                expect(statusCode).toBe(500);

                expect(createUserControllerMock).toHaveBeenCalled();
            })
        }),
        describe.only("given the credentials are valid", () => {
            it("return 200, body and token", async () => {
                const createUserControllerMock = jest
                    .spyOn(UserController, "register")
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);

                const { statusCode, body } = await supertest(createServer())
                    .post("/api/auth/register")
                    .send(userInput);

                expect(statusCode).toBe(200);

                expect(createUserControllerMock).toHaveBeenCalledWith(userInput);
            })
        })
    })


})
// user
// register
    // error 500
    // success
// login
// error 404 not found
// error 400 not valid password
// error 500
// success
// getUser
// error 404 not found
// error 500
// success
// getAllUsers
// error 404 not found
// error 500
// success
// deleteUser
// error 500
// error 404 not found
// success
// updateUser
// error 500
// success