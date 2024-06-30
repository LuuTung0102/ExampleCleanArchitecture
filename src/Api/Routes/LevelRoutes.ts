import express from 'express';
import LevelController from '../Controllers/LevelController';
import { upload } from "../Middlewares/upimage"; 

const router = express.Router();
const levelController = new LevelController();
const { authenticateToken, authorizationMiddleware } = require('../Middlewares/AuthMiddleware')

//May be need to use authorization middleware here. The reason is that usually only admin can CRUD level data
// authenticateToken, authorizationMiddleware(["Admin"])
router.post('/level/create', upload.single('icon'), levelController.createLevel);
router.delete('/level/delete/:levelId', levelController.deleteLevel);
router.get('/level/get-all', levelController.getLevels);
router.patch('/level/update/:levelId', upload.single('icon'), levelController.updateLevel);
router.get('/level/:levelId', levelController.getLevelById)

module.exports = router