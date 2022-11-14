import ApiError from "../utils/errors/api.error";
import typeRepository from "./type.repository";

class TypeService {
    async addType(name: string) {
        const candidate = await typeRepository.findType(name);
        if (candidate) {
            throw ApiError.badRequest(`This type already exists`);
        }

        const type = await typeRepository.addType(name);

        return type;
    }

    async deleteType(id: string) {
        const deletedType = await typeRepository.deleteType(id);

        if (!deletedType) {
            throw ApiError.badRequest(`Type with this id is not found`);
        }

        return deletedType;
    }

    async getAllTypes() {
        const types = await typeRepository.getAllTypes();

        return types;
    }
}

export default new TypeService();
