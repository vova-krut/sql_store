import { NextFunction, Request, Response } from "express";
import {
    CreateProductInput,
    SelectProductInput,
    UpdateProductInput,
} from "./product.schema";
import productService from "./product.service";

class ProductController {
    async createProduct(
        req: Request<{}, {}, CreateProductInput["body"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { title, description, price, brandId, typeId } = req.body;
            const product = await productService.createProduct(
                title,
                description,
                price,
                brandId,
                typeId
            );

            return res.json({ product });
        } catch (e) {
            next(e);
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const brandId = Number(req.query.brandId as string) || 0;
            const typeId = Number(req.query.typeId as string) || 0;
            const limit = Number(req.query.limit as string) || 0;
            const page = Number(req.query.page as string) || 0;

            const products = await productService.getAllProducts(
                brandId,
                typeId,
                limit,
                page
            );

            return res.json({ products });
        } catch (e) {
            next(e);
        }
    }

    async getProduct(
        req: Request<SelectProductInput["params"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;
            const product = await productService.getProduct(id);

            return res.json({ product });
        } catch (e) {
            next(e);
        }
    }

    async deleteProduct(
        req: Request<SelectProductInput["params"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;
            const deletedProduct = await productService.deleteProduct(id);

            return res.json({ deletedProduct });
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(
        req: Request<
            UpdateProductInput["params"],
            {},
            UpdateProductInput["body"]
        >,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;
            const { title, description, price, brandId, typeId } = req.body;

            const updatedProduct = await productService.updateProduct(
                id,
                title,
                description,
                price,
                brandId,
                typeId
            );

            return res.json({ updatedProduct });
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController();
