import buildServer from "../server";
import request from "supertest";
import configDb from "../utils/db/configDb";
import { createProductInput, getAccessToken, Product } from "./helpers";

const app = buildServer();
let userToken = "";
let adminToken = "";

describe("product", () => {
    beforeAll(async () => {
        await configDb();
        userToken = await getAccessToken("user@mail.com", "user");
        adminToken = await getAccessToken("admin@mail.com", "admin");
    });

    afterAll((done) => {
        done();
    });

    describe("get products route", () => {
        describe("get all products", () => {
            it("should return products", async () => {
                const { statusCode, body } = await request(app).get(
                    "/products"
                );

                expect(statusCode).toEqual(200);
                expect(body.products).toBeInstanceOf(Array<typeof Product>);
            });
        });

        describe("get products of specific brand", () => {
            it("should return only products of specific brand", async () => {
                const { statusCode, body } = await request(app).get(
                    "/products?brandId=1"
                );

                expect(statusCode).toEqual(200);
                body.products.forEach((product: typeof Product) => {
                    expect(product).toEqual({ ...Product, brandId: 1 });
                });
            });
        });

        describe("get products of specific type", () => {
            it("should return only products of specific type", async () => {
                const { statusCode, body } = await request(app).get(
                    "/products?typeId=1"
                );

                expect(statusCode).toEqual(200);
                body.products.forEach((product: typeof Product) => {
                    expect(product).toEqual({ ...Product, typeId: 1 });
                });
            });
        });

        describe("get specific amount of products", () => {
            it("should only return specific amounts of products", async () => {
                const { statusCode, body } = await request(app).get(
                    "/products?limit=3"
                );

                expect(statusCode).toEqual(200);
                expect(body.products.length).toEqual(3);
            });
        });

        describe("get a single specific product", () => {
            it("should only return one specific product", async () => {
                const { statusCode, body } = await request(app).get(
                    "/products/1"
                );

                expect(statusCode).toEqual(200);
                expect(body.product).toEqual(Product);
            });
        });
    });

    describe("add product route", () => {
        describe("given the token of default user", () => {
            it("should return a 403", async () => {
                const { statusCode } = await request(app)
                    .post("/products")
                    .set("Authorization", `Bearer ${userToken}`)
                    .send(createProductInput);

                expect(statusCode).toEqual(403);
            });
        });

        describe("given the token of admin", () => {
            describe("and invalid input", () => {
                it("should return a 400", async () => {
                    const { statusCode } = await request(app)
                        .post("/products")
                        .set("Authorization", `Bearer ${adminToken}`)
                        .send({ ...createProductInput, price: "-23" });

                    expect(statusCode).toEqual(400);
                });
            });

            describe("and valid input", () => {
                it("should return a new product", async () => {
                    const { statusCode, body } = await request(app)
                        .post("/products")
                        .set("Authorization", `Bearer ${adminToken}`)
                        .send(createProductInput);

                    expect(statusCode).toEqual(200);
                    expect(body.product).toEqual(Product);
                });
            });
        });
    });

    describe("update product route", () => {
        describe("given the token of default user", () => {
            it("should return a 403", async () => {
                const { statusCode } = await request(app)
                    .put("/products/1")
                    .set("Authorization", `Bearer ${userToken}`)
                    .send(createProductInput);

                expect(statusCode).toEqual(403);
            });
        });

        describe("given the token of admin", () => {
            describe("and invalid input", () => {
                it("should return a 400", async () => {
                    const { statusCode } = await request(app)
                        .put("/products/1")
                        .set("Authorization", `Bearer ${adminToken}`)
                        .send({ ...createProductInput, price: "Test" });

                    expect(statusCode).toEqual(400);
                });
            });

            describe("and valid input", () => {
                it("should return an updated product", async () => {
                    const { statusCode, body } = await request(app)
                        .put("/products/1")
                        .set("Authorization", `Bearer ${adminToken}`)
                        .send({ ...createProductInput, title: "Title change" });

                    expect(statusCode).toEqual(200);
                    expect(body.updatedProduct).toEqual(Product);
                });
            });
        });
    });

    describe("delete product route", () => {
        describe("given the token of default user", () => {
            it("should return a 403", async () => {
                const { statusCode } = await request(app)
                    .delete("/products/1")
                    .set("Authorization", `Bearer ${userToken}`);

                expect(statusCode).toEqual(403);
            });
        });

        describe("given the token of admin", () => {
            describe("and invalid input", () => {
                it("should return a 404", async () => {
                    const { statusCode } = await request(app)
                        .delete("/products/99999")
                        .set("Authorization", `Bearer ${adminToken}`);

                    expect(statusCode).toEqual(404);
                });
            });

            describe("and valid input", () => {
                it("should return a deleted product", async () => {
                    const { statusCode, body } = await request(app)
                        .delete("/products/1")
                        .set("Authorization", `Bearer ${adminToken}`);

                    expect(statusCode).toEqual(200);
                    expect(body.deletedProduct).toEqual(Product);
                });
            });
        });
    });
});
