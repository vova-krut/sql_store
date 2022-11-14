import pool from "../utils/db/db";

type ProductType = {
    id: number;
    name: string;
};

class TypeRepository {
    async addType(name: string): Promise<ProductType> {
        const type = await pool.query(
            `INSERT INTO public."Types" (name) values ($1) RETURNING *`,
            [name]
        );
        return type.rows[0];
    }

    async findType(name: string): Promise<ProductType> {
        const type = await pool.query(
            `SELECT * FROM public."Types" WHERE name = $1`,
            [name]
        );
        return type.rows[0];
    }

    async deleteType(id: string): Promise<ProductType> {
        const type = await pool.query(
            `DELETE FROM public."Types" WHERE id = $1 RETURNING *`,
            [id]
        );
        return type.rows[0];
    }

    async getAllTypes(): Promise<ProductType[]> {
        const types = await pool.query(`SELECT * FROM public."Types"`);
        return types.rows;
    }
}

export default new TypeRepository();
