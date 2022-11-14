import { object, string, TypeOf } from "zod";

export const addTypeSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
    }),
});
export type AddTypeInput = TypeOf<typeof addTypeSchema>;

export const deleteTypeSchema = object({
    params: object({
        id: string(),
    }),
});
export type DeleteTypeInput = TypeOf<typeof deleteTypeSchema>;
