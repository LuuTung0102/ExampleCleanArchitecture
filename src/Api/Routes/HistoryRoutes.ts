import {History} from "../../Domain/Entities/HistoryEntities";
import express from 'express';
import HistoryController from "../Controllers/HistoryController";

declare global {
    namespace Express {
        interface Request {
            history?: typeof History;
        }
    }
}

const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");

const router = express.Router();

const historyController = new HistoryController();

router.post("/history/create", historyController.CreateHistory);
router.get("/history/find/:id", historyController.GetHistoryById);
router.put("/history/update:id", historyController.UpdateHistoryById);
router.delete("/history/delete/:id",historyController.DeleteUserById);

module.exports = router;