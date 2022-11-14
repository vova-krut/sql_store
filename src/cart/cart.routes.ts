import { Router } from "express";
import authMiddleware from "../utils/middlewares/auth.middleware";
import validate from "../utils/middlewares/validate.middleware";
import cartController from "./cart.controller";
import {
    addProductToCartSchema,
    deleteProductFromCartSchema,
} from "./cart.schema";

const cartRouter = Router();

cartRouter.post(
    "/",
    [validate(addProductToCartSchema), authMiddleware],
    cartController.addProductToCart
);
cartRouter.get("/", authMiddleware, cartController.getCartForUser);
cartRouter.delete(
    "/:productId",
    [validate(deleteProductFromCartSchema), authMiddleware],
    cartController.deleteProductFromCart
);

export default cartRouter;
