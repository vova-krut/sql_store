import pool from "../utils/db/db";

type Product = {
    title: string;
    description: string;
    price: string;
    brandId: number;
    typeId: number;
};

class ProductRepository {
    async findProductByTitle(title: string): Promise<Product> {
        const product = await pool.query(
            `SELECT * FROM public."Products" WHERE title = $1`,
            [title]
        );

        return product.rows[0];
    }

    async findProductById(id: string): Promise<Product> {
        const product = await pool.query(
            `SELECT * FROM public."Products" WHERE id = $1`,
            [id]
        );
        return product.rows[0];
    }

    async createProduct(
        title: string,
        description: string,
        price: number,
        brandId: number,
        typeId: number
    ): Promise<Product> {
        const product = await pool.query(
            `INSERT INTO public."Products" (title, description, price, "brandId", "typeId") values ($1, $2, $3, $4, $5) RETURNING *`,
            [title, description, price, brandId, typeId]
        );

        return product.rows[0];
    }

    async getAllProducts(
        brandId: number,
        typeId: number,
        limit: number,
        offset: number
    ): Promise<Product[]> {
        let products = await pool.query(
            `SELECT * FROM public."Products" LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        if (brandId && !typeId) {
            products = await pool.query(
                `SELECT * FROM public."Products" WHERE "brandId" = $1 LIMIT $2 OFFSET $3`,
                [brandId, limit, offset]
            );
        }
        if (!brandId && typeId) {
            products = await pool.query(
                `SELECT * FROM public."Products" WHERE "typeId" = $1 LIMIT $2 OFFSET $3`,
                [typeId, limit, offset]
            );
        }
        if (brandId && typeId) {
            products = await pool.query(
                `SELECT * FROM public."Products" WHERE "brandId" = $1 AND "typeId" = $2 LIMIT $3 OFFSET $4`,
                [brandId, typeId, limit, offset]
            );
        }

        return products.rows;
    }

    async deleteProduct(productId: string): Promise<Product> {
        const deletedProduct = await pool.query(
            `DELETE FROM public."Products" WHERE id = $1 RETURNING *`,
            [productId]
        );

        return deletedProduct.rows[0];
    }

    async updateProduct(
        productId: string,
        title: string,
        description: string,
        price: number,
        brandId: number,
        typeId: number
    ): Promise<Product> {
        const updatedProduct = await pool.query(
            `UPDATE public."Products" SET title = $1, description = $2, price = $3, "brandId" = $4, "typeId" = $5 WHERE id = $6 RETURNING *`,
            [title, description, price, brandId, typeId, productId]
        );
        return updatedProduct.rows[0];
    }
}

export default new ProductRepository();
