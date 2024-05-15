import { DeleteUserReqV2 } from './../../Application/Features/UserV2/Requests/DeleteUserReqV2';
import { Request, Response } from 'express';

import { StatusCodeEnums } from '../../Domain/Enums/StatusCodeEnums';
import { CreateUserHandlerV2 } from '../../Application/Features/UserV2/Handlers/CreateUserHandlerV2';
import { CreateUserReqV2 } from './../../Application/Features/UserV2/Requests/CreateUserReqV2';
import { ReadUserHandlerV2 } from '../../Application/Features/UserV2/Handlers/ReadUserHandlerV2';
import { ReadUserReqV2 } from './../../Application/Features/UserV2/Requests/ReadUserReqV2';
import { UpdateUserHandlerV2 } from '../../Application/Features/UserV2/Handlers/UpdateUserHandlerV2';
import { DeleteUserHandlerV2 } from '../../Application/Features/UserV2/Handlers/DeleteUserHandlerV2';
import { UpdateUserReqV2 } from '../../Application/Features/UserV2/Requests/UpdateUserReqV2';
export default class UserController {
	async CreateUser(req: Request<any, any, CreateUserReqV2>, res: Response): Promise<Response> {
		try {
			const { fullname, password } = req.body;
			const data: any = { fullname, password };
			const result: any = await CreateUserHandlerV2(data);
			if (result.error != undefined || result.error) {
				return res.status(result.statusCode).json({ error: result.error });
			}
			return res.status(result.statusCode).json(result);
		} catch (error: any) {
			return res.status(StatusCodeEnums.InternalServerError_500).json({ error: error.messgae });
		}
	}
	async ReadUserById(req: Request<any, any, ReadUserReqV2>, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const result: any = await ReadUserHandlerV2(id);
			return res.status(result.statusCode).json({ message: result });
		} catch (error: any) {
			return res.status(StatusCodeEnums.InternalServerError_500).json({ error: error.messgae });
		}
	}
	async UpdateUserById(req: Request<any, any, UpdateUserReqV2>, res: Response): Promise<Response> {
		try {
			const { userId, fullname } = req.body;
			const data: any = {
				userId,
				fullname,
			};
			const result: any = await UpdateUserHandlerV2(data);
			if (result.error != undefined || result.error) {
				return res.status(result.statusCode).json({ error: result.error });
			}
			return res.status(result.statusCode).json(result);
		} catch (error: any) {
			return res.status(StatusCodeEnums.InternalServerError_500).json({ error: error.messgae });
		}
	}
	async DeleteUserById(req: Request<any, any, DeleteUserReqV2>, res: Response): Promise<Response> {
		try {
			const { userId } = req.body;
			const data: any = {
				userId,
			};
			const result: any = await DeleteUserHandlerV2(data);
			if (result.error != undefined || result.error) {
				return res.status(result.statusCode).json({ error: result.error });
			}
			return res.status(result.statusCode).json(result);
		} catch (error: any) {
			return res.status(StatusCodeEnums.InternalServerError_500).json({ error: error.messgae });
		}
	}
}
