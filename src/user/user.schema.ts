import { object, string, TypeOf } from "zod";

const userInput = {
    name: string({
        required_error: "Name is required",
    }),
    email: string({
        required_error: "Email is required ",
    }).email("Not a valid email"),
};

export const createUserSchema = object({
    body: object({
        ...userInput,
        password: string({
            required_error: "Password is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});
export type CreateUserInput = TypeOf<typeof createUserSchema>;

export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email"),
        password: string({ required_error: "Password is required" }),
    }),
});
export type LoginUserInput = TypeOf<typeof loginUserSchema>;

export const updateUserSchema = object({
    body: object({ ...userInput }),
});
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
