import { Request, Response, query } from "express";
import { CreateCategoryRequest } from "../../Application/Features/Category/Requests/CreateCategoryRequest";
import { CreateCategoryHandler } from "../../Application/Features/Category/Handlers/CreateCategoryHandler";
import { GetCategoryRequest } from "../../Application/Features/Category/Requests/GetCategoryRequest";
import { GetCategoryHandler } from "../../Application/Features/Category/Handlers/GetCategoryHandler";
import { GetAllCategoryRequest } from "../../Application/Features/Category/Requests/GetAllCategoryRequest";
import { GetAllCategoryHandler } from "../../Application/Features/Category/Handlers/GetAllCategoryHandler";
import { UpdateCategoryRequest } from "../../Application/Features/Category/Requests/UpdateCategoryRequest";
import { UpdateCategoryHandler } from "../../Application/Features/Category/Handlers/UpdateCategoryHandler";
import { DeleteCategoryRequest } from "../../Application/Features/Category/Requests/DeleteCategoryRequest";
import { DeleteCategoryHandler } from "../../Application/Features/Category/Handlers/DeleteCategoryHandler";

export default class CategoryController {
    async createCategory(
        req: Request<any, any, CreateCategoryRequest>, 
        res: Response): Promise<Response> {
            try {
                const { userId, stems } = req.body;
                if(!stems) return res.status(400).json("Invalid Stem")
                const createCategoryData = { userId, stems };
        
                const result = await CreateCategoryHandler(createCategoryData);
        
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
            const result = await GetCategoryHandler(data)

            return res.status(200).json(result);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        }

    async getAllCategory(
        req: Request<any, any, GetAllCategoryRequest>,
        res: Response): Promise<Response> {
            try {
                const result = await GetAllCategoryHandler()
                return res.status(200).json(result);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        }

    async updateCategory(
        req: Request<any, any, UpdateCategoryRequest>,
        res: Response): Promise<Response> {
            try {
                const {categoryId, userId, stems} = req.body;
                
                const data = {categoryId, userId, stems};
                const result = UpdateCategoryHandler(data);

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
                // const userId = (req as any).user.userId
                const data = {categoryId, stems}
                const result = await DeleteCategoryHandler(data)

            return res.status(200).json(result);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        }
}