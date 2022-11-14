import cartRepository from "./cart.repository";

class CartService {
    async addProductToCart(
        productId: number,
        quantity: number,
        userId: number
    ) {
        const updatedCart = await cartRepository.addProductToUserCart(
            productId,
            quantity,
            userId
        );

        return updatedCart;
    }

    async getCartForUser(userId: number) {
        const cart = await cartRepository.getCartForUser(userId);

        return cart;
    }

    async deleteProductFromCart(productId: string, userId: number) {
        const updatedCart = await cartRepository.deleteProductFromUserCart(
            productId,
            userId
        );

        return updatedCart;
    }
}

export default new CartService();
