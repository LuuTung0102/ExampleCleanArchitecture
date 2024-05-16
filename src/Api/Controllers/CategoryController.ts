import { Request, Response, query } from "express";
import { CreateCategoryRequest } from "../../Application/Features/Category/Requests/CreateCategoryRequest";
import { CreateCategoryHandle } from "../../Application/Features/Category/Handlers/CreateCategoryHandle";
import { GetCategoryRequest } from "../../Application/Features/Category/Requests/GetCategoryRequest";
import { GetCategoryHandle } from "../../Application/Features/Category/Handlers/GetCategoryHandle";
import { GetAllCategoryRequest } from "../../Application/Features/Category/Requests/GetAllCategoryRequest";
import { GetAllCategoryHandle } from "../../Application/Features/Category/Handlers/GetAllCategoryHandle";
import { UpdateCategoryRequest } from "../../Application/Features/Category/Requests/UpdateCategoryRequest";
import { UpdateCategoryHandle } from "../../Application/Features/Category/Handlers/UpdateCategoryHandle";
import { DeleteCategoryRequest } from "../../Application/Features/Category/Requests/DeleteCategoryRequest";
import { DeleteCategoryHandle } from "../../Application/Features/Category/Handlers/DeleteCategoryHandle";

export default class CategoryController {
    async createCategory(
        req: Request<any, any, CreateCategoryRequest>, 
        res: Response): Promise<Response> {
            try {
                const { userId, stems } = req.body;
                const createCategoryData = { userId, stems };
        
                const result = await CreateCategoryHandle(createCategoryData);
        
                return res.status(200).json(result);
            } catch (error: any) {
                console.error(error);
                return res.status(500).json({message: error.message});
            }
        }
    
    async getCategory(
        req: Request<any, any, GetCategoryRequest>,
        res: Response): Promise<Response> {
            try {
                const {categoryId} = req.body
            const data = {categoryId}
            const result = await GetCategoryHandle(data)

            return res.status(200).json(result);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        }

    async getAllCategory(
        req: Request<any, any, GetAllCategoryRequest>,
        res: Response): Promise<Response> {
            try {
                const result = await GetAllCategoryHandle()
                return res.status(200).json(result);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        }

    async updateCategory(
        req: Request<any, any, UpdateCategoryRequest>,
        res: Response): Promise<Response> {
            try {
                const {userId, stems, categoryId} = req.body;
                // const categoryId = (req as any).category._id;

                const data = {userId, stems};
                const result = UpdateCategoryHandle(categoryId, data);

                return res.status(200).json(result);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        }

    async deleteCategory(
        req: Request<any, any, DeleteCategoryRequest>,
        res: Response): Promise<Response> {
            try {
                const {categoryId, stems} = req.body
                const userId = (req as any).user.userId
                const data = {categoryId, stems}
                const result = await DeleteCategoryHandle(data)

            return res.status(200).json(result);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        }
}