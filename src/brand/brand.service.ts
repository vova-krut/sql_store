import ApiError from "../utils/errors/api.error";
import brandRepository from "./brand.repository";

class BrandService {
    async addBrand(name: string) {
        const candidate = await brandRepository.findBrand(name);
        if (candidate) {
            throw ApiError.badRequest(`This brand already exists`);
        }

        const brand = await brandRepository.addBrand(name);

        return brand;
    }

    async deleteBrand(id: string) {
        const deletedBrand = await brandRepository.deleteBrand(id);

        if (!deletedBrand) {
            throw ApiError.badRequest(`Brand with this id does not exist`);
        }

        return deletedBrand;
    }

    async getAllBrands() {
        const brands = await brandRepository.getAllBrands();

        return brands;
    }
}

export default new BrandService();
