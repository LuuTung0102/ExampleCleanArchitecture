import { UpdateImageRequest } from './../../Application/Features/User/Requests/UpdateImageRequest';
import { UpdatePassRequest } from './../../Application/Features/User/Requests/UpdatePassRequest';
import { CreateUserRequest } from './../../Application/Features/User/Requests/CreateUserRequest';
import { Request, Response, query } from 'express';
import LoginHandler from '../../Application/Features/User/Handlers/LoginHandler';
import { LoginRequest } from '../../Application/Features/User/Requests/LoginRequest';
import { CreateUserHandler } from '../../Application/Features/User/Handlers/CreateUserHandler';
import { ChangePasswordRequest } from '../../Application/Features/User/Requests/ChangePasswordRequest';
import { ForgotPasswordHandler } from '../../Application/Features/User/Handlers/ForgotPasswordHandler';
import { verifyEmailHandler } from '../../Application/Features/User/Handlers/VerifyEmailHandler';
import { getProfileHandler } from '../../Application/Features/User/Handlers/GetProfileHandler';
import { GetUserProfileRequest } from '../../Application/Features/User/Requests/GetUserProfileRequest';
import { VerifyForgotPasswordByEmailCodeRequest } from '../../Application/Features/User/Requests/VerifyForgotPasswordByEmailCodeRequest';
import UpdateImageHandler from '../../Application/Features/User/Handlers/UpdateImageHandler';
import { VerifyForgotPasswordByEmailCodeHandler } from '../../Application/Features/User/Handlers/VerifyForgotPasswordByEmailCodeHandler';

import ChangePasswordHandler from '../../Application/Features/User/Handlers/ChangePasswordHandler';
import UpdatePassHandler from '../../Application/Features/User/Handlers/UpdatePassHandler';

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
}
