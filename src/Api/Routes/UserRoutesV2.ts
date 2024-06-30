import express from 'express';
import UserController from '../Controllers/UserControllerV2';
import { User } from '../../Domain/Entities/UserEntitesV2';
declare global {
	namespace Express {
		interface Request {
			user?: typeof User;
		}
	}
}

const router = express.Router();

const userController = new UserController();

router.get("/", userController.index);
router.post("/signup", userController.createUser);
router.post("/update", userController.updateUser)

module.exports = router;
