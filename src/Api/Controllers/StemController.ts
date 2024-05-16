import {Request, Response} from "express";
import {CreateStemRequest} from "../../Application/Features/Stem/Requests/CreateStemRequest";
import {CreateStemHandle} from "../../Application/Features/Stem/Handlers/CreateStemHandle";
import {DeleteStemRequest} from "../../Application/Features/Stem/Requests/DeleteStemRequest";
import {UpdateStemRequest} from "../../Application/Features/Stem/Requests/UpdateStemRequest";
import {FindStemRequest} from "../../Application/Features/Stem/Requests/FindStemRequest";
import {FindAllStemRequest} from "../../Application/Features/Stem/Requests/FindAllStemRequest";
import {FindAllStemHandle} from "../../Application/Features/Stem/Handlers/FindAllStemHandle";
import {FindStemHandle} from "../../Application/Features/Stem/Handlers/FindStemHandle";
import {UpdateStemHandle} from "../../Application/Features/Stem/Handlers/UpdateStemHandle";
import {DeleteStemHandle} from "../../Application/Features/Stem/Handlers/DeleteStemHandle";


export default class StemController {

    async createStem(
        req: Request<any, any, CreateStemRequest>,
        res: Response,
    ): Promise<Response> {
        try {
            const data = {
                ...req.body
            }
            const result = await CreateStemHandle(data)
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({message: error.message});
        }
    }

    async findAllStem(
        req: Request<any, any, FindAllStemRequest>,
        res: Response,
    ): Promise<Response> {
        try {
            const data = {
                ...req.body
            }

            const result = await FindAllStemHandle(data)
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({message: error.message});
        }
    }

    async findStem(
        req: Request<any, any, FindStemRequest>,
        res: Response,
    ): Promise<Response> {
        try {
            const data = {
                ...req.body
            }
            const result = await FindStemHandle(data)
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({message: error.message});
        }
    }

    async updateStem(
        req: Request<any, any, UpdateStemRequest>,
        res: Response,
    ): Promise<Response> {
        try {
            const data = req.body
            const result = await UpdateStemHandle(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({message: error.message});
        }
    }

    async deleteStem(
        req: Request<any, any, DeleteStemRequest>,
        res: Response,
    ): Promise<Response> {
        try {
            const data = {
                ...req.body,
            }
            const result = await DeleteStemHandle(data)
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({message: error.message});
        }
    }
}