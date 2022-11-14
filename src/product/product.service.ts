import ApiError from "../utils/errors/api.error";
import productRepository from "./product.repository";

class ProductService {
    async createProduct(
        title: string,
        description: string,
        price: number,
        brandId: number,
        typeId: number
    ) {
        const candidate = await productRepository.findProductByTitle(title);
        if (candidate) {
            throw ApiError.badRequest("product with this title already exists");
        }

        const product = await productRepository.createProduct(
            title,
            description,
            price,
            brandId,
            typeId
        );

        return product;
    }

    async getAllProducts(
        brandId: number,
        typeId: number,
        limit: number,
        page: number
    ) {
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        const products = await productRepository.getAllProducts(
            brandId,
            typeId,
            limit,
            offset
        );

        return products;
    }

    async getProduct(id: string) {
        const product = await productRepository.findProductById(id);
        if (!product) {
            throw ApiError.badRequest(`Product with this id was not found`);
        }

        return product;
    }

    async deleteProduct(productId: string) {
        const deletedProduct = await productRepository.deleteProduct(productId);

        if (!deletedProduct) {
            throw ApiError.badRequest(`Product with this id does not exist`);
        }

        return deletedProduct;
    }

    async updateProduct(
        productId: string,
        title: string,
        description: string,
        price: number,
        brandId: number,
        typeId: number
    ) {
        const product = await productRepository.findProductById(productId);
        if (!product) {
            throw ApiError.badRequest(`product with this id was not found`);
        }

        const updatedProduct = await productRepository.updateProduct(
            productId,
            title,
            description,
            price,
            brandId,
            typeId
        );

        return updatedProduct;
    }
}

export default new ProductService();
