import { Router } from "express";
import roleMiddleware from "../utils/middlewares/role.middleware";
import validate from "../utils/middlewares/validate.middleware";
import typeController from "./type.controller";
import { addTypeSchema, deleteTypeSchema } from "./type.schema";

const typeRouter = Router();

typeRouter.post(
    "/",
    [validate(addTypeSchema), roleMiddleware("ADMIN")],
    typeController.addType
);

typeRouter.delete(
    "/:id",
    [validate(deleteTypeSchema), roleMiddleware("ADMIN")],
    typeController.deleteType
);

typeRouter.get("/", typeController.getAllTypes);

export default typeRouter;
