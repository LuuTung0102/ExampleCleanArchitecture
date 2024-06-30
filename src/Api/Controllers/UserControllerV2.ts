import { CreateUserRequest } from './../../Application/Features/User/Requests/CreateUserRequest';
import { Request, Response, query } from 'express';
import { LoginRequestV2 } from '../../Application/Features/User/Requests/LoginRequestV2';
import { CreateUserHandlerV2 } from '../../Application/Features/User/Handlers/CreateUserHandlerV2';
import { UpdateUserHandlerV2 } from '../../Application/Features/User/Handlers/UpdateUserHandlerV2';

export default class UserController {
	async index(req: Request, res: Response): Promise<Response> {
		// #swagger.description = 'get role by id'
		// #swagger.tags = ["User"]
		try {
			return res.status(200).send(`Hello`);
		} catch (error: any) {
			console.error('Login failed:', error);
			return res.status(500).json({ error: error.message });
		}
	}

	async createUser(req: Request<any, any, CreateUserRequest>, res: Response): Promise<Response> {
		try {
			const { fullname, password } = req.body;
			const data: any = {
				fullname: fullname,
				password: password,
			};

			const result: any = await CreateUserHandlerV2(data);
			console.log(result)
			if (result.error != undefined || result.error) {
				return res.status(result.statusCode).json({ error: result.error });
			}

			return res.status(result.statusCode).json(result);
		} catch (error: any) {
			return res.status(500).json({ error: error.messgae });
		}
	}

	async updateUser(req: Request<any, any>, res: Response): Promise<any> {
		try {
			const { id, fullname, password } = req.body;
			const data: any = {
				id: id,
				fullname: fullname,
				password: password,
			};

			const result: any = await UpdateUserHandlerV2(data);
			console.log(result)
			if (result.error != undefined || result.error) {
				return res.status(result.statusCode).json({ error: result.error });
			}

			return res.status(result.statusCode).json(result);
		} catch (error: any) {
			return res.status(500).json({ error: error.messgae });
		}
	}
}
