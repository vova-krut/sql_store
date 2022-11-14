import { NextFunction, Request, Response } from "express";
import { AddTypeInput, DeleteTypeInput } from "./type.schema";
import typeService from "./type.service";

class TypeController {
    async addType(
        req: Request<{}, {}, AddTypeInput["body"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name } = req.body;
            const type = await typeService.addType(name);

            return res.json({ type });
        } catch (e) {
            next(e);
        }
    }

    async deleteType(
        req: Request<DeleteTypeInput["params"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;
            const deletedType = await typeService.deleteType(id);

            return res.json({ deletedType });
        } catch (e) {
            next(e);
        }
    }

    async getAllTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const types = await typeService.getAllTypes();

            return res.json({ types });
        } catch (e) {
            next(e);
        }
    }
}

export default new TypeController();
