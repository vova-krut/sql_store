import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/api.error";

export default (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: err.message });
};
