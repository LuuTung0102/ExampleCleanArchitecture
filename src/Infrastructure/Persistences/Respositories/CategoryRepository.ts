import mongoose, {ClientSession} from "mongoose";
import ICategoryRepository from "../../../Application/Persistences/IRepositories/ICategoryRepository";
import { CategoryWithBase } from "../../../Domain/Entities/CategoryEntites";


class CategoryRepository implements ICategoryRepository {
    async createCategory(CategoryData: any, session: ClientSession): Promise<typeof CategoryWithBase> {
        try {
            const category: any = await CategoryWithBase.create([{
                userId: CategoryData.userId,
                stems: CategoryData.stems
            }], {session});
            return category[0];
        } catch (error: any) {
            throw new Error("Error at createCategory in CategoryRepository: " + error.message);
        }  
    }
    getCategoryById(CategoryId: string, queryData: any): Promise<typeof CategoryWithBase | null> {
        try {
            const _id = new mongoose.Types.ObjectId(CategoryId);
            const category: any = CategoryWithBase.findOne({
                _id,
                isDelete: queryData.isDelete,
                isActive: queryData.isActive,
            });
            return category;
        } catch (error: any) {
            throw new Error("Error at getCategoryById in CategoryRepository: " + error.message);
        }
        
    }

    async getAllCategory(queryData: any): Promise<typeof CategoryWithBase[] | null> {
        try {
            const categories: typeof CategoryWithBase[] = await CategoryWithBase.find({
                isDelete: queryData.isDelete
            });
            return categories;
        } catch (error: any) {
            throw new Error("Error at getAllCategory in CategoryRepository: " + error.message);
        }
    }

    async updateCategoryById(CategoryId: string, CategoryData: any, session: ClientSession): Promise<void> {
        try {
            const _id = new mongoose.Types.ObjectId(CategoryId);
            const category:any = CategoryWithBase.findByIdAndUpdate(
                _id,
                CategoryData,
                {session}
            );
            return category;
        } catch
            (error: any) {
            throw new Error("Error at updateCategoryById in CategoryRepository: " + error.message);
        }
    }

    async deleteCategoryById(CategoryId: string, session: ClientSession): Promise<void> {
        try {
            const _id = new mongoose.Types.ObjectId(CategoryId);
            const category: any = CategoryWithBase.findByIdAndUpdate(_id, {
                isDelete: true
            }, {session});
            return category;
        } catch (error: any) {
            throw new Error("Error at deleteCategoryById in CategoryRepository: " + error.message);
        }
    }
}

export default CategoryRepository;