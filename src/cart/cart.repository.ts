import pool from "../utils/db/db";

type Cart = {
    productId: number;
    quantity: number;
    title: string;
    description: string;
    price: string;
    brandId: number;
    typeId: number;
};

class CartRepository {
    async addProductToUserCart(
        productId: number,
        quantity: number,
        userId: number
    ) {
        const product = await this._findProductForUser(productId, userId);

        if (product) {
            await pool.query(
                `UPDATE public."Carts" SET quantity = $1 WHERE "productId" = $2 AND "userId" = $3`,
                [(product.quantity += quantity), productId, userId]
            );
        } else {
            await pool.query(
                `INSERT INTO public."Carts" ("productId", quantity, "userId") values ($1, $2, $3)`,
                [productId, quantity, userId]
            );
        }

        const updatedCart = await this.getCartForUser(userId);

        return updatedCart;
    }

    async getCartForUser(userId: number): Promise<Cart[]> {
        const cart = await pool.query(
            `SELECT "productId", quantity, title, description, price, "brandId", "typeId" FROM public."Carts" c JOIN public."Products" p ON c."productId" = p.id AND c."userId" = $1`,
            [userId]
        );

        return cart.rows;
    }

    async deleteProductFromUserCart(productId: string, userId: number) {
        await pool.query(
            `DELETE FROM public."Carts" WHERE "productId" = $1 AND "userId" = $2`,
            [productId, userId]
        );

        const updatedCart = await this.getCartForUser(userId);

        return updatedCart;
    }

    private async _findProductForUser(productId: number, userId: number) {
        const cart = await this.getCartForUser(userId);

        const product = cart.find((product) => product.productId === productId);

        return product;
    }
}

export default new CartRepository();
