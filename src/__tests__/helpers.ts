import request from "supertest";
import buildServer from "../server";

const app = buildServer();

export const createUserInput = {
    name: "Andrew",
    email: "andrew@mail.com",
    password: "Password123",
    passwordConfirmation: "Password123",
};
export const user = {
    id: expect.any(Number),
    name: expect.any(String),
    email: expect.any(String),
    role: "USER",
};
export const userReturn = {
    token: expect.any(String),
    user,
};

export const Type = {
    id: expect.any(Number),
    name: expect.any(String),
};
export const createTypeInput = {
    name: "Test Type",
};

export const Brand = {
    id: expect.any(Number),
    name: expect.any(String),
};
export const createBrandInput = {
    name: "Test Type",
};

export const Product = {
    id: expect.any(Number),
    title: expect.any(String),
    description: expect.any(String),
    price: expect.any(String),
    brandId: expect.any(Number),
    typeId: expect.any(Number),
};
export const createProductInput = {
    title: "Test",
    description: "Just a test product",
    price: 9.99,
    brandId: 1,
    typeId: 1,
};

export const Cart = {
    title: expect.any(String),
    description: expect.any(String),
    price: expect.any(String),
    brandId: expect.any(Number),
    typeId: expect.any(Number),
    userId: expect.any(Number),
    quantity: expect.any(Number),
};
export const addProductToCartInput = {
    productId: 1,
    quantity: 1,
};

export async function getAccessToken(
    email: string,
    password: string
): Promise<string> {
    const { body } = await request(app)
        .post("/users/login")
        .send({ email, password });

    return body.token;
}
