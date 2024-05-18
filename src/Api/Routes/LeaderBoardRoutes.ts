import express from 'express';
import LeaderBoardController from "../Controllers/LeaderBoardController";
import { LeaderBoard } from '../../Domain/Entities/LeaderBoardEntities';


const router = express.Router();
const leaderBoardController = new LeaderBoardController();
router.post("/leaderboard/create", leaderBoardController.createLeaderBoard);
router.get("/leaderboard/get/", leaderBoardController.getLeaderBoard);
router.post("/leaderboard/update/", leaderBoardController.updateLeaderBoard);
router.post("/leaderboard/delete/", leaderBoardController.deleteLeaderBoard);

module.exports = router;