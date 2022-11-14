import { object, string, TypeOf } from "zod";

export const addBrandSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
    }),
});
export type AddBrandInput = TypeOf<typeof addBrandSchema>;

export const deleteBrandSchema = object({
    params: object({
        id: string(),
    }),
});
export type DeleteBrandInput = TypeOf<typeof deleteBrandSchema>;
