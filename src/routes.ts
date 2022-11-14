import { Router } from "express";
import brandRouter from "./brand/brand.routes";
import cartRouter from "./cart/cart.routes";
import productRouter from "./product/product.routes";
import typeRouter from "./type/type.routes";
import userRouter from "./user/user.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/types", typeRouter);
router.use("/brands", brandRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);

export default router;
