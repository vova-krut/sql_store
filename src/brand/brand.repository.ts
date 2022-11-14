import pool from "../utils/db/db";

type Brand = {
    id: number;
    name: string;
};

class BrandRepository {
    async addBrand(name: string): Promise<Brand> {
        const brand = await pool.query(
            `INSERT INTO public."Brands" (name) values ($1) RETURNING *`,
            [name]
        );
        return brand.rows[0];
    }

    async findBrand(name: string): Promise<Brand> {
        const brand = await pool.query(
            `SELECT * FROM public."Brands" WHERE name = $1`,
            [name]
        );
        return brand.rows[0];
    }

    async deleteBrand(id: string): Promise<Brand> {
        const brand = await pool.query(
            `DELETE FROM public."Brands" WHERE id = $1 RETURNING *`,
            [id]
        );
        return brand.rows[0];
    }

    async getAllBrands(): Promise<Brand[]> {
        const brands = await pool.query(`SELECT * FROM public."Brands"`);
        return brands.rows;
    }
}

export default new BrandRepository();
