import userRepository from "./user.repository";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/errors/api.error";

const generateJwt = (id: number, email: string, role: string) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY!, {
        expiresIn: "1h",
    });
};

class UserService {
    async registration(
        name: string,
        email: string,
        password: string,
        role?: string
    ) {
        const candidate = await userRepository.findUserByEmail(email);
        if (candidate) {
            throw ApiError.badRequest(
                `User with email '${email}' already exists`
            );
        }

        const hashPassword = bcrypt.hashSync(password, 8);

        const user = await userRepository.createUser(
            name,
            email,
            hashPassword,
            role
        );

        const token = generateJwt(user.id, user.email, user.role);

        return { token, user };
    }

    async login(email: string, password: string) {
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            throw ApiError.unAuthorized("Email or password is incorrect");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password!);
        if (!passwordsMatch) {
            throw ApiError.unAuthorized("Email or password is incorrect");
        }

        const token = generateJwt(user.id, user.email, user.role);

        delete user.password;

        return { token, user };
    }

    async getCurrentUser(userId: number) {
        const user = await userRepository.findUserById(userId);

        return user;
    }

    async deleteCurrentUser(userId: number) {
        const deletedUser = await userRepository.deleteUser(userId);

        return deletedUser;
    }

    async updateCurrentUser(userId: number, name: string, email: string) {
        const updatedUser = await userRepository.updateUser(
            userId,
            name,
            email
        );

        return updatedUser;
    }
}

export default new UserService();
