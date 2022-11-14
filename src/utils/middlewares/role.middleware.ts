import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (role: string) =>
    (req: Request, res: Response, next: NextFunction) => {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "User is not authorized" });
            }

            const decoded = jwt.verify(
                token,
                process.env.SECRET_KEY!
            ) as jwt.JwtPayload;

            if (decoded.role !== role) {
                return res.status(403).json({ message: "You have no access" });
            }

            res.locals.user = decoded;
            next();
        } catch (e) {
            return res.status(401).json({ message: "User is not authorized" });
        }
    };
