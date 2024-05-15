import {Category} from "../../Domain/Entities/CategoryEntites";
import express from 'express';


declare global {
    namespace Express {
        interface Request {
            category?: typeof Category;
        }
    }
}

const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");

const router = express.Router();

// const categoryController = new CategoryController();

// router.post("/category/create", categoryController.createcategory);
// router.get("/category/find", categoryController.findcategory);
// router.get("/category/all", categoryController.findAllcategory);
// router.put("/category/update", categoryController.updatecategory);
// router.delete("/category/delete",categoryController.deletecategory);

module.exports = router;