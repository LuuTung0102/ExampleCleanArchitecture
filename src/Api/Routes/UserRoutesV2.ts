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

const { authenticateToken, authorizationMiddleware } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

const userController = new UserController();

router.post("/create", userController.CreateUser);
router.get("/:id", userController.ReadUserById);
router.patch("/update", userController.UpdateUserById);
router.delete("/delete", userController.DeleteUserById);

module.exports = router;
