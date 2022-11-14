import buildServer from "../server";
import request from "supertest";
import configDb from "../utils/db/configDb";
import { addProductToCartInput, Cart, getAccessToken } from "./helpers";

const app = buildServer();
let userToken = "";

describe("cart", () => {
    beforeAll(async () => {
        await configDb();
        userToken = await getAccessToken("user@mail.com", "user");
    });

    describe("add product to cart route", () => {
        describe("given invalid/no token", () => {
            it("should return a 401", async () => {
                const { statusCode } = await request(app)
                    .post("/cart")
                    .set("Authorization", `Bearer WrongToken`)
                    .send(addProductToCartInput);

                expect(statusCode).toEqual(401);
            });
        });

        describe("given a valid token", () => {
            describe("and invalid input", () => {
                it("should return 400", async () => {
                    const { statusCode } = await request(app)
                        .post("/cart")
                        .set("Authorization", `Bearer ${userToken}`)
                        .send({ ...addProductToCartInput, quantity: "test" });

                    expect(statusCode).toEqual(400);
                });
            });

            describe("and valid input", () => {
                it("should return an updated cart", async () => {
                    const { statusCode, body } = await request(app)
                        .post("/cart")
                        .set("Authorization", `Bearer ${userToken}`)
                        .send(addProductToCartInput);

                    expect(statusCode).toEqual(200);
                    expect(body.updatedCart).toBeInstanceOf(Array<typeof Cart>);
                });
            });
        });
    });

    describe("get cart route", () => {
        describe("given invalid/no token", () => {
            it("should return a 401", async () => {
                const { statusCode } = await request(app)
                    .get("/cart")
                    .set("Authorization", `Bearer WrongToken`);

                expect(statusCode).toEqual(401);
            });
        });

        describe("given a valid token", () => {
            it("should return a cart for user", async () => {
                const { statusCode, body } = await request(app)
                    .get("/cart")
                    .set("Authorization", `Bearer ${userToken}`);

                expect(statusCode).toEqual(200);
                expect(body.cart).toBeInstanceOf(Array<typeof Cart>);
            });
        });
    });

    describe("delete cart route", () => {
        describe("given invalid/no token", () => {
            it("should return a 401", async () => {
                const { statusCode } = await request(app)
                    .delete("/cart/1")
                    .set("Authorization", `Bearer WrongToken`);

                expect(statusCode).toEqual(401);
            });
        });

        describe("given a valid token", () => {
            it("should return an updated cart", async () => {
                const { statusCode, body } = await request(app)
                    .delete("/cart/1")
                    .set("Authorization", `Bearer ${userToken}`);

                expect(statusCode).toEqual(200);
                expect(body.updatedCart).toBeInstanceOf(Array<typeof Cart>);
            });
        });
    });
});
