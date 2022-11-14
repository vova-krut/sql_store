import pool from "../utils/db/db";

type User = {
    id: number;
    email: string;
    name: string;
    role: string;
    password?: string;
};

class UserRepository {
    async findUserByEmail(email: string): Promise<User> {
        const user = await pool.query(
            'SELECT * FROM public."Users" WHERE email = $1',
            [email]
        );
        return user.rows[0];
    }

    async findUserById(id: number): Promise<User> {
        const user = await pool.query(
            'SELECT id, name, email, role FROM public."Users" WHERE id = $1',
            [id]
        );
        return user.rows[0];
    }

    async createUser(
        name: string,
        email: string,
        password: string,
        role = "USER"
    ): Promise<User> {
        const user = await pool.query(
            'INSERT INTO public."Users" (name, email, password, role) values ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, password, role]
        );
        return user.rows[0];
    }

    async deleteUser(userId: number): Promise<User> {
        const deletedUser = await pool.query(
            `DELETE FROM public."Users" WHERE id = $1 RETURNING id, name, email, role`,
            [userId]
        );

        return deletedUser.rows[0];
    }

    async updateUser(
        userId: number,
        name: string,
        email: string
    ): Promise<User> {
        const updatedUser = await pool.query(
            `UPDATE public."Users" SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, role`,
            [name, email, userId]
        );

        return updatedUser.rows[0];
    }
}

export default new UserRepository();
