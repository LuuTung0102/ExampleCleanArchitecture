import { Request, Response } from 'express';
import { CreateLevelRequest } from './../../Application/Features/Level/Request/CreateLevelRequest';
import { CreateLevelHandler } from '../../Application/Features/Level/Handlers/CreateLevelHandler';
import { GetLevelByIdRequest } from '../../Application/Features/Level/Request/GetLevelByIdRequest';
import { DeleteLevelByIdHandler } from '../../Application/Features/Level/Handlers/DeleteLevelHandler';
import { GetLevelsHandler } from '../../Application/Features/Level/Handlers/GetLevelsHandler';
import { UpdateLevelRequest } from '../../Application/Features/Level/Request/UpdateLevelRequest';
import { UpdateLevelHandler } from '../../Application/Features/Level/Handlers/UpdateLevelHandler';
import { GetLevelByIdHandler } from '../../Application/Features/Level/Handlers/GetLevelByIdHandler';

export default class LevelController {
    async createLevel (req: Request<any, any, CreateLevelRequest>, res: Response): Promise<Response> {
        try {
            const { level, xp, description, iconPath } = req.body;

            const data: any = {
                level, xp, description, iconPath
            };

            const result: any = await CreateLevelHandler(data);

            return res.status(result.statusCode).json({ result });
        }   
        catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteLevel (req: Request<GetLevelByIdRequest, any, any>, res: Response): Promise<Response> {
        try {
            const { levelId } = req.params;

            const result: any = await DeleteLevelByIdHandler({ id: levelId });

            return res.status(result.statusCode).json({ result });
        }
        catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getLevels (req: Request, res: Response): Promise<Response> {
        try {
            const result: any = await GetLevelsHandler(); //truyền phân trang

            return res.status(result.statusCode).json({ result })
        }
        catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateLevel (req: Request<GetLevelByIdRequest, any, UpdateLevelRequest>, res: Response): Promise<Response> {
        try {
            const { levelId } = req.params;

            const result: any = await UpdateLevelHandler(levelId, req.body);

            return res.status(result.statusCode).json({ result });
        }
        catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getLevelById (req: Request<GetLevelByIdRequest, any, any>, res: Response): Promise<Response> {
        try {
            const { levelId } = req.params;

            const result: any = await GetLevelByIdHandler({ levelId });

            return res.status(result.statusCode).json(result);
        }
        catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}