import express from 'express';
import LevelController from '../Controllers/LevelController';

const router = express.Router();
const levelController = new LevelController();
const { authenticateToken, authorizationMiddleware } = require('../Middlewares/AuthMiddleware')

//May be need to use authorization middleware here. The reason is that usually only admin can CRUD level data
// authenticateToken, authorizationMiddleware(["Admin"])
router.post('/create', levelController.createLevel);
router.delete('/delete/:levelId', levelController.deleteLevel);
router.get('/get-all', levelController.getLevels);
router.patch('/update/:levelId', levelController.updateLevel);
router.get('/:levelId', levelController.getLevelById)

module.exports = router