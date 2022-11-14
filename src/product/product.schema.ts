import { object, string, number, TypeOf } from "zod";

const productInput = {
    title: string({
        required_error: "Title is required",
    }),
    description: string({
        required_error: "Description is required",
    }),
    price: number({
        required_error: "Price is required",
    }).positive("Price can not be negative"),
    brandId: number({
        required_error: "BrandId is required",
    }),
    typeId: number({
        required_error: "TypeId is required",
    }),
};

const selectProduct = {
    id: string(),
};

export const createProductSchema = object({
    body: object({ ...productInput }),
});
export type CreateProductInput = TypeOf<typeof createProductSchema>;

export const selectProductSchema = object({
    params: object({ ...selectProduct }),
});
export type SelectProductInput = TypeOf<typeof selectProductSchema>;

export const updateProductSchema = object({
    body: object({ ...productInput }),
    params: object({ ...selectProduct }),
});
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
