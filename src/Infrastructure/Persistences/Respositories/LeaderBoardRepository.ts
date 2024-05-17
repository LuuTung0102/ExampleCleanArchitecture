import { LeaderBoard, LeaderBoardWithBase } from "../../../Domain/Entities/LeaderBoardEntities";
import ILeaderBoardRepository from "../../../Application/Persistences/IRepositories/ILeaderBoardRepository";
import mongoose from "mongoose";

class LeaderBoardRepository implements ILeaderBoardRepository{
    async createLeaderBoard(LeaderBoardData: any): Promise<typeof LeaderBoardWithBase>{
        try {
            const leaderBoard: any = await LeaderBoardWithBase.create([{
              createAt: LeaderBoardData.create.At,
              updateAt: LeaderBoardData.updateAt,
              isActive: LeaderBoardData.isActive,
              isDelete: LeaderBoardData.isDelete,
              userID: LeaderBoardData.userID,
              xp: LeaderBoardData.xp
            }]);           
            return leaderBoard[0];
          } catch (error: any) {
            throw new Error(
              "Error at createLeaderBoard in LeaderBoardRepository: " + error.message
            );
          }
    }
    async getLeaderBoardById(LeaderBoardId: string): Promise<typeof LeaderBoardWithBase>{
      try {
        const query: any = {
          _id: new mongoose.Types.ObjectId(LeaderBoardId),
        };
        const leaderBoard: typeof LeaderBoardWithBase[] = await LeaderBoardWithBase.find(query);
        return leaderBoard[0];
      } catch (error: any) {
        throw new Error(
          "Error at getLeaderBoardById in LeaderBoardRepository: " + error.meesage
        );
      }
    }
    async updateLeaderBoardById(LeaderBoardId: string, queryData: any){
      try {
        const query: any = {
          _id: new mongoose.Types.ObjectId(LeaderBoardId),
        };
        await LeaderBoardWithBase.updateOne(query, queryData);
      } catch (error: any) {
        throw new Error(
          "Error at getLeaderBoardById in LeaderBoardRepository: " + error.meesage
        );
      }
    }
    async deleteLeaderBoardById(LeaderBoardId: string){
      try {
        const query: any = {
          _id: new mongoose.Types.ObjectId(LeaderBoardId),
        };
        await LeaderBoardWithBase.deleteOne(query);
      } catch (error: any) {
        throw new Error(
          "Error at getLeaderBoardById in LeaderBoardRepository: " + error.meesage
        );
      }
    }
}

export default LeaderBoardRepository;