import buildServer from "../server";
import request from "supertest";
import configDb from "../utils/db/configDb";
import { getAccessToken, createUserInput, userReturn, user } from "./helpers";

const app = buildServer();
let token = "";

describe("user", () => {
    beforeAll(async () => {
        await configDb();
        token = await getAccessToken("user@mail.com", "user");
    });

    describe("registration route", () => {
        describe("given the email and password are valid", () => {
            it("should return the user and token", async () => {
                const { statusCode, body } = await request(app)
                    .post("/users/registration")
                    .send(createUserInput);

                expect(statusCode).toEqual(200);
                expect(body).toEqual(userReturn);
            });
        });

        describe("given the passwords do not match", () => {
            it("should return a 400", async () => {
                const { statusCode } = await request(app)
                    .post("/users/registration")
                    .send({
                        ...createUserInput,
                        passwordConfirmation: "NotMatch",
                    });

                expect(statusCode).toEqual(400);
            });
        });

        describe("given the user already exists", () => {
            it("should return a 404", async () => {
                const { statusCode } = await request(app)
                    .post("/users/registration")
                    .send(createUserInput);

                expect(statusCode).toEqual(404);
            });
        });
    });

    describe("login route", () => {
        describe("given the email and password are valid", () => {
            it("should return the user and token", async () => {
                const { statusCode, body } = await request(app)
                    .post("/users/login")
                    .send(createUserInput);

                expect(statusCode).toEqual(200);
                expect(body).toEqual(userReturn);
            });
        });

        describe("given the input data is not valid", () => {
            it("should return a 401", async () => {
                const { statusCode } = await request(app)
                    .post("/users/login")
                    .send({ ...createUserInput, email: "user@mail.com" });

                expect(statusCode).toEqual(401);
            });
        });
    });

    describe("me route", () => {
        describe("get me route", () => {
            describe("given valid token", () => {
                it("should return user from db", async () => {
                    const { statusCode } = await request(app)
                        .get("/users/me")
                        .set("Authorization", `Bearer ${token}`);

                    expect(statusCode).toEqual(200);
                });
            });

            describe("given invalid token", () => {
                it("should return a 401", async () => {
                    const { statusCode } = await request(app)
                        .get("/users/me")
                        .set("Authorization", `Bearer token`);

                    expect(statusCode).toEqual(401);
                });
            });
        });

        describe("update me route", () => {
            describe("given a valid payload", () => {
                it("should update a user", async () => {
                    const { statusCode, body } = await request(app)
                        .put("/users/me")
                        .set("Authorization", `Bearer ${token}`)
                        .send({ email: "user@mail.com", name: "Default User" });

                    expect(statusCode).toEqual(200);
                    expect(body.updatedUser).toEqual(user);
                });
            });

            describe("given an invalid payload", () => {
                it("should return a 400", async () => {
                    const { statusCode, body } = await request(app)
                        .put("/users/me")
                        .set("Authorization", `Bearer ${token}`)
                        .send({ email: "blabla", nams: "SuperUser" });

                    expect(statusCode).toEqual(400);
                });
            });
        });

        describe("delete me route", () => {
            describe("given invalid token", () => {
                it("should return a 401", async () => {
                    const { statusCode } = await request(app)
                        .delete("/users/me")
                        .set("Authorization", `Bearer token`);

                    expect(statusCode).toEqual(401);
                });
            });

            describe("given a valid token", () => {
                it("should return a deleted user", async () => {
                    const { statusCode, body } = await request(app)
                        .delete("/users/me")
                        .set("Authorization", `Bearer ${token}`);

                    expect(statusCode).toEqual(200);
                    expect(body.deletedUser).toEqual(user);
                });
            });
        });
    });
});
