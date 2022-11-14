import { NextFunction, Request, Response } from "express";
import {
    CreateUserInput,
    LoginUserInput,
    UpdateUserInput,
} from "./user.schema";
import userService from "./user.service";

class UserController {
    async registration(
        req: Request<{}, {}, CreateUserInput["body"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name, email, password } = req.body;
            const data = await userService.registration(name, email, password);

            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async login(
        req: Request<{}, {}, LoginUserInput["body"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { email, password } = req.body;
            const data = await userService.login(email, password);

            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getCurrentUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userPayload = res.locals.user;
            const currentUser = await userService.getCurrentUser(
                userPayload.id
            );

            return res.json({ currentUser });
        } catch (e) {
            next(e);
        }
    }

    async deleteCurrentUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = res.locals.user;

            const deletedUser = await userService.deleteCurrentUser(id);

            return res.json({ deletedUser });
        } catch (e) {
            next(e);
        }
    }

    async updateCurrentUser(
        req: Request<{}, {}, UpdateUserInput["body"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = res.locals.user;
            const { name, email } = req.body;

            const updatedUser = await userService.updateCurrentUser(
                id,
                name,
                email
            );

            return res.json({ updatedUser });
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
