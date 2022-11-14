import buildServer from "../server";
import request from "supertest";
import configDb from "../utils/db/configDb";
import { getAccessToken, Type, createTypeInput } from "./helpers";

const app = buildServer();
let userToken = "";
let adminToken = "";

describe("type", () => {
    beforeAll(async () => {
        await configDb();
        userToken = await getAccessToken("user@mail.com", "user");
        adminToken = await getAccessToken("admin@mail.com", "admin");
    });

    describe("get types route", () => {
        it("should return types", async () => {
            const { statusCode, body } = await request(app).get("/types");

            expect(statusCode).toEqual(200);
            expect(body.types).toBeInstanceOf(Array<typeof Type>);
        });
    });

    describe("add type route", () => {
        describe("given the token of default user", () => {
            it("should return a 403", async () => {
                const { statusCode } = await request(app)
                    .post("/types")
                    .set("Authorization", `Bearer ${userToken}`)
                    .send(createTypeInput);

                expect(statusCode).toEqual(403);
            });
        });

        describe("given the token of admin", () => {
            describe("and invalid input", () => {
                it("should return a 400", async () => {
                    const { statusCode } = await request(app)
                        .post("/types")
                        .set("Authorization", `Bearer ${adminToken}`)
                        .send({ nams: "TestType" });

                    expect(statusCode).toEqual(400);
                });
            });

            describe("and valid input", () => {
                it("should return a new type", async () => {
                    const { statusCode, body } = await request(app)
                        .post("/types")
                        .set("Authorization", `Bearer ${adminToken}`)
                        .send(createTypeInput);

                    expect(statusCode).toEqual(200);
                    expect(body.type).toEqual(Type);
                });
            });
        });
    });

    describe("delete type route", () => {
        describe("given the token of default user", () => {
            it("should return a 403", async () => {
                const { statusCode } = await request(app)
                    .delete("/types/3")
                    .set("Authorization", `Bearer ${userToken}`);

                expect(statusCode).toEqual(403);
            });
        });

        describe("given the token of admin", () => {
            describe("and invalid typeId", () => {
                it("should return a 404", async () => {
                    const { statusCode } = await request(app)
                        .delete("/types/100")
                        .set("Authorization", `Bearer ${adminToken}`);

                    expect(statusCode).toEqual(404);
                });
            });

            describe("and valid typeId", () => {
                it("should return a deleted type", async () => {
                    const { statusCode, body } = await request(app)
                        .delete("/types/3")
                        .set("Authorization", `Bearer ${adminToken}`);

                    expect(statusCode).toEqual(200);
                    expect(body.deletedType).toEqual(Type);
                });
            });
        });
    });
});
