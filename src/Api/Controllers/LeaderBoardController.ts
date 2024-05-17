import { CreateLeaderBoardRequest } from "./../../Application/Features/LeaderBoard/Requests/CreateLeaderBoardRequest";
import { GetLeaderBoardRequest } from "./../../Application/Features/LeaderBoard/Requests/GetLeaderBoardRequest";
import { UpdateLeaderBoardRequest } from "./../../Application/Features/LeaderBoard/Requests/UpdateLeaderBoardRequest";
import { DeleteLeaderBoardRequest } from "./../../Application/Features/LeaderBoard/Requests/DeleteLeaderBoardRequest";
import { Request, Response, query } from "express";
import { CreateLeaderBoardHandler } from '../../Application/Features/LeaderBoard/Handlers/CreateLeaderBoardHandler';
import { GetLeaderBoardHandler } from '../../Application/Features/LeaderBoard/Handlers/GetLeaderBoardHandler';
import { UpdateLeaderBoardHandler } from '../../Application/Features/LeaderBoard/Handlers/UpdateLeaderBoardHandler';
import { DeleteLeaderBoardHandler } from '../../Application/Features/LeaderBoard/Handlers/DeleteLeaderBoardHandler';

export default class LeaderBoardController{
    async createLeaderBoard(
        req: Request<any, any, CreateLeaderBoardRequest>,
        res: Response
      ): Promise<Response> {
        try {
          const { userId, xp } = req.body;
          const data: any = {
            userId: userId,
            xp: xp,
          };
          const result: any = await CreateLeaderBoardHandler(data);
          if (result.error != undefined || result.error) {
            return res.status(result.statusCode).json({ error: result.error });
          }
          return res.status(result.statusCode).json(result);
        } catch (error: any) {
          return res.status(500).json({ error: error.messgae });
        }
    }

    async getLeaderBoard(req: Request<any, any, GetLeaderBoardRequest>, res: Response): Promise<Response> {
        try {
            const {_id} = (req as any).user;
            const result: any = await GetLeaderBoardHandler(_id);
            return res.status(result.statusCode).json({message: result});
        } catch (error: any) {
            return res.status(500).json({error: error.messgae});
        }
    }

    async updateLeaderBoard(req: Request<any, any, UpdateLeaderBoardRequest>, res: Response): Promise<Response> {
      try {
          const {_id, isActive, isDelete, userId, xp} = (req as any).user;
          const result: any = await UpdateLeaderBoardHandler({_id,isActive, isDelete, userId, xp});
          return res.status(result.statusCode).json({message: result});
      } catch (error: any) {
          return res.status(500).json({error: error.messgae});
      }
    }

    async deleteLeaderBoard(req: Request<any, any, DeleteLeaderBoardRequest>, res: Response): Promise<Response> {
      try {
          const {_id} = (req as any).user;
          const result: any = await DeleteLeaderBoardHandler(_id);
          return res.status(result.statusCode).json({message: result});
      } catch (error: any) {
          return res.status(500).json({error: error.messgae});
      }
    }

}