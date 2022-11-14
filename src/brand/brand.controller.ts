import { NextFunction, Request, Response } from "express";
import { AddBrandInput, DeleteBrandInput } from "./brand.schema";
import brandService from "./brand.service";

class BrandController {
    async addBrand(
        req: Request<{}, {}, AddBrandInput["body"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name } = req.body;
            const brand = await brandService.addBrand(name);

            return res.json({ brand });
        } catch (e) {
            next(e);
        }
    }

    async deleteBrand(
        req: Request<DeleteBrandInput["params"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;
            const deletedBrand = await brandService.deleteBrand(id);

            return res.json({ deletedBrand });
        } catch (e) {
            next(e);
        }
    }

    async getAllBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const brands = await brandService.getAllBrands();

            return res.json({ brands });
        } catch (e) {
            next(e);
        }
    }
}

export default new BrandController();
