import { Router } from "express";
import roleMiddleware from "../utils/middlewares/role.middleware";
import validate from "../utils/middlewares/validate.middleware";
import brandController from "./brand.controller";
import { addBrandSchema, deleteBrandSchema } from "./brand.schema";

const brandRouter = Router();

brandRouter.post(
    "/",
    [validate(addBrandSchema), roleMiddleware("ADMIN")],
    brandController.addBrand
);

brandRouter.delete(
    "/:id",
    [validate(deleteBrandSchema), roleMiddleware("ADMIN")],
    brandController.deleteBrand
);

brandRouter.get("/", brandController.getAllBrands);

export default brandRouter;
