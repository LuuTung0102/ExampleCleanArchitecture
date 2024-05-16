import {Stem} from "../../Domain/Entities/StemEntites";
import express from 'express';
import StemController from "../Controllers/StemController";

declare global {
    namespace Express {
        interface Request {
            stem?: typeof Stem;
        }
    }
}

const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");

const router = express.Router();

const stemController = new StemController();

router.post("/stem/create", stemController.createStem);
router.get("/stem/all", stemController.findAllStem);
router.get("/stem/find", stemController.findStem);
router.put("/stem/update", stemController.updateStem);
router.delete("/stem/delete",stemController.deleteStem);

module.exports = router;