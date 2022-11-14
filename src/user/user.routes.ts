import { Router } from "express";
import userController from "./user.controller";
import validate from "../utils/middlewares/validate.middleware";
import authMiddleware from "../utils/middlewares/auth.middleware";
import {
    createUserSchema,
    loginUserSchema,
    updateUserSchema,
} from "./user.schema";

const userRouter = Router();

userRouter.post(
    "/registration",
    validate(createUserSchema),
    userController.registration
);
userRouter.post("/login", validate(loginUserSchema), userController.login);
userRouter.get("/me", authMiddleware, userController.getCurrentUser);
userRouter.delete("/me", authMiddleware, userController.deleteCurrentUser);
userRouter.put(
    "/me",
    [validate(updateUserSchema), authMiddleware],
    userController.updateCurrentUser
);

export default userRouter;
