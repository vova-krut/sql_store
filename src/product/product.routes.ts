import { Router } from "express";
import roleMiddleware from "../utils/middlewares/role.middleware";
import validate from "../utils/middlewares/validate.middleware";
import productController from "./product.controller";
import {
    createProductSchema,
    selectProductSchema,
    updateProductSchema,
} from "./product.schema";

const productRouter = Router();

productRouter.post(
    "/",
    [validate(createProductSchema), roleMiddleware("ADMIN")],
    productController.createProduct
);

productRouter.get(
    "/:id",
    validate(selectProductSchema),
    productController.getProduct
);

productRouter.get("/", productController.getAllProducts);

productRouter.delete(
    "/:id",
    [validate(selectProductSchema), roleMiddleware("ADMIN")],
    productController.deleteProduct
);

productRouter.put(
    "/:id",
    [validate(updateProductSchema), roleMiddleware("ADMIN")],
    productController.updateProduct
);

export default productRouter;
