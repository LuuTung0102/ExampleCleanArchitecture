import { ClientSession } from "mongoose";
import { LeaderBoard, LeaderBoardWithBase } from "../../../Domain/Entities/LeaderBoardEntities";



interface ILeaderBoardRepository{
    createLeaderBoard(LeaderBoardData: any): Promise<typeof LeaderBoardWithBase>;
    getLeaderBoardById(LeaderBoardId: string, queryData: any): Promise<typeof LeaderBoardWithBase>;
    updateLeaderBoardById(LeaderBoardId: string, queryData: any);
    deleteLeaderBoardById(LeaderBoardId: string, queryData: any);
}

export default ILeaderBoardRepository;