import { createHistoryRequest } from "./../../Application/Features/History/Requests/createHistoryRequest";
import { createHistoryHandler } from "./../../Application/Features/History/Handlers/createHistoryHandler";
import { findHistoryHandler } from "../../Application/Features/History/Handlers/findHistoryHandler";
import { findHistoryRequest } from "../../Application/Features/History/Requests/findHistoryRequest";
import { deleteHistoryHandler } from "./../../Application/Features/History/Handlers/deleteHistoryHandler";
import { deleteHistoryRequest } from "./../../Application/Features/History/Requests/deleteHistoryRequest";
import { updateHistoryRequest } from "../../Application/Features/History/Requests/updateHistoryRequest";
import { updateHistoryHandler } from "../../Application/Features/History/Handlers/updateHistoryHandler";

import { Request, Response } from 'express';
import HistoryRepository from "../../Infrastructure/Persistences/Respositories/HistoryRepository";

export default class HistroyController {
	async CreateHistory(req: Request<any, any, createHistoryRequest>, res: Response): Promise<Response> {
		try {
			const historyData  = req.body;			
			const result: any = await createHistoryHandler(historyData);
            return res.status(201).json(result);
		} catch (error: any) {
			return  res.status(500).json({ message: 'Internal server error' });
		}
	}
	async GetHistoryById(req: Request<any, any, findHistoryRequest>, res: Response): Promise<Response> {
		try {
			const historyId = req.params.id;
			const queryData = {
				// isDelete: false,
			}	
			const result: any = await findHistoryHandler(historyId,queryData);
			return res.status(201).json(result);
		} catch (error: any) {
			return res.status(500).json({ message: 'Internal server error' });
		}
	}
	async UpdateHistoryById(req: Request<any, any, updateHistoryRequest>, res: Response): Promise<void> {
		try {
            const historyId = req.params.id;
			const historyData = req.body;
			const result: any = await updateHistoryHandler(historyData);
			res.status(result.statusCode).json(result);
		} catch (error: any) {
			res.status(500).json({ message: 'Internal server error' });
		}
	}
	async DeleteUserById(req: Request<any, any, deleteHistoryRequest>, res: Response): Promise<void> {
		try {
			const historyId = req.params.id;

			const result: any = await deleteHistoryHandler(historyId);
			res.status(result.statusCode).json(result);
		} catch (error: any) {
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}