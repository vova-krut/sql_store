import { object, string, number, TypeOf } from "zod";

export const addProductToCartSchema = object({
    body: object({
        productId: number({
            required_error: "ProductId is required",
        }),
        quantity: number({
            required_error: "Quantity is required",
        }),
    }),
});
export type AddProductToCartInput = TypeOf<typeof addProductToCartSchema>;

export const deleteProductFromCartSchema = object({
    params: object({
        productId: string(),
    }),
});
export type DeleteProductFromCartInput = TypeOf<
    typeof deleteProductFromCartSchema
>;
