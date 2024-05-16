import express from 'express';
import LevelController from '../Controllers/LevelController';
import { upload } from "../Middlewares/UploadIcon"; 

const router = express.Router();
const levelController = new LevelController();
const { authenticateToken, authorizationMiddleware } = require('../Middlewares/AuthMiddleware')

//May be need to use authorization middleware here. The reason is that usually only admin can CRUD level data
// authenticateToken, authorizationMiddleware(["Admin"])
router.post('/create', upload.single('icon'), levelController.createLevel);
router.delete('/delete/:levelId', levelController.deleteLevel);
router.get('/get-all', levelController.getLevels);
router.patch('/update/:levelId', upload.single('icon'), levelController.updateLevel);
router.get('/:levelId', levelController.getLevelById)

module.exports = router