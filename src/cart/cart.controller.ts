import { NextFunction, Request, Response } from "express";
import {
    AddProductToCartInput,
    DeleteProductFromCartInput,
} from "./cart.schema";
import cartService from "./cart.service";

class CartController {
    async addProductToCart(
        req: Request<{}, {}, AddProductToCartInput["body"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = res.locals.user.id;
            const { productId, quantity } = req.body;

            const updatedCart = await cartService.addProductToCart(
                productId,
                quantity,
                userId
            );

            return res.json({ updatedCart });
        } catch (e) {
            next(e);
        }
    }

    async getCartForUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.user.id;

            const cart = await cartService.getCartForUser(userId);

            return res.json({ cart });
        } catch (e) {
            next(e);
        }
    }

    async deleteProductFromCart(
        req: Request<DeleteProductFromCartInput["params"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = res.locals.user.id;
            const { productId } = req.params;

            const updatedCart = await cartService.deleteProductFromCart(
                productId,
                userId
            );

            return res.json({ updatedCart });
        } catch (e) {
            next(e);
        }
    }
}

export default new CartController();
