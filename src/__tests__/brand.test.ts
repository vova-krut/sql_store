import buildServer from "../server";
import request from "supertest";
import configDb from "../utils/db/configDb";
import { getAccessToken, Brand, createBrandInput } from "./helpers";

const app = buildServer();
let userToken = "";
let adminToken = "";

describe("brand", () => {
    beforeAll(async () => {
        await configDb();
        userToken = await getAccessToken("user@mail.com", "user");
        adminToken = await getAccessToken("admin@mail.com", "admin");
    });

    describe("get brands route", () => {
        it("should return brands", async () => {
            const { statusCode, body } = await request(app).get("/brands");

            expect(statusCode).toEqual(200);
            expect(body.brands).toBeInstanceOf(Array<typeof Brand>);
        });
    });

    describe("add brand route", () => {
        describe("given the token of default user", () => {
            it("should return a 403", async () => {
                const { statusCode } = await request(app)
                    .post("/brands")
                    .set("Authorization", `Bearer ${userToken}`)
                    .send(createBrandInput);

                expect(statusCode).toEqual(403);
            });
        });

        describe("given the token of admin", () => {
            describe("and invalid input", () => {
                it("should return a 400", async () => {
                    const { statusCode } = await request(app)
                        .post("/brands")
                        .set("Authorization", `Bearer ${adminToken}`)
                        .send({ nams: "TestBrand" });

                    expect(statusCode).toEqual(400);
                });
            });

            describe("and valid input", () => {
                it("should return a new brand", async () => {
                    const { statusCode, body } = await request(app)
                        .post("/brands")
                        .set("Authorization", `Bearer ${adminToken}`)
                        .send(createBrandInput);

                    expect(statusCode).toEqual(200);
                    expect(body.brand).toEqual(Brand);
                });
            });
        });
    });

    describe("delete brand route", () => {
        describe("given the token of default user", () => {
            it("should return a 403", async () => {
                const { statusCode } = await request(app)
                    .delete("/brands/3")
                    .set("Authorization", `Bearer ${userToken}`);

                expect(statusCode).toEqual(403);
            });
        });

        describe("given the token of admin", () => {
            describe("and invalid brandId", () => {
                it("should return a 404", async () => {
                    const { statusCode } = await request(app)
                        .delete("/brands/100")
                        .set("Authorization", `Bearer ${adminToken}`);

                    expect(statusCode).toEqual(404);
                });
            });

            describe("and valid brandId", () => {
                it("should return a deleted brand", async () => {
                    const { statusCode, body } = await request(app)
                        .delete("/brands/3")
                        .set("Authorization", `Bearer ${adminToken}`);

                    expect(statusCode).toEqual(200);
                    expect(body.deletedBrand).toEqual(Brand);
                });
            });
        });
    });
});
