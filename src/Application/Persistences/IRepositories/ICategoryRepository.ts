import {ClientSession} from "mongoose";
import {CategoryWithBase} from "../../../Domain/Entities/CategoryEntites";

interface ICategoryRepository {
    createCategory(CategoryData: any, session: ClientSession): Promise<typeof CategoryWithBase>;

    getCategoryById(CategoryId: string, queryData: any): Promise<typeof CategoryWithBase | null>;

    getAllCategory(queryData: any): Promise<typeof CategoryWithBase[] | null>;

    updateCategoryById(CategoryId: string, CategoryData: any, session: ClientSession): Promise<void>;

    deleteCategoryById(CategoryId: string, session: ClientSession): Promise<void>;
}

export default ICategoryRepository;