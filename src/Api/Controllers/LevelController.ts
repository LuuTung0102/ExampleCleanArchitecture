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
            const { level, xp, description } = req.body;

            if (!(req as any)?.file)
                return res.status(400).json({ error: 'Lack of icon' })

            const fileName: string = (req as any).file.filename;
            const fullPath: string = `uploads/level-icons/${fileName}`;

            const data: any = {
                level, xp, description, iconPath: fullPath
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
            const { page, perPage } = req.query;

            const result: any = await GetLevelsHandler(page, perPage); 

            return res.status(result.statusCode).json({ result })
        }
        catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateLevel (req: Request<any, any, UpdateLevelRequest>, res: Response): Promise<Response> {
        try {
            const { levelId } = req.params;

            if ((req as any)?.file) {
                const fileName: string = (req as any).file.filename;
                const fullPath: string = `uploads/level-icons/${fileName}`;
                req.body.iconPath = fullPath;
            }

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