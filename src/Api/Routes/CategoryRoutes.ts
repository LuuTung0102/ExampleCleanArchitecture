import {Category} from "../../Domain/Entities/CategoryEntites";
import express from 'express';
import CategoryController from "../Controllers/CategoryController";


declare global {
    namespace Express {
        interface Request {
            category?: typeof Category;
        }
    }
}

const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");

const router = express.Router();

const categoryController = new CategoryController();

router.post("/category/create", categoryController.createCategory);
router.get("/category/get", categoryController.getCategory);
router.get("/category/all", categoryController.getAllCategory);
router.put("/category/update", categoryController.updateCategory);
router.delete("/category/delete",categoryController.deleteCategory);

module.exports = router;