import { LeaderBoard, LeaderBoardWithBase } from "../../../Domain/Entities/LeaderBoardEntities";
import ILeaderBoardRepository from "../../../Application/Persistences/IRepositories/ILeaderBoardRepository";
import mongoose from "mongoose";

class LeaderBoardRepository implements ILeaderBoardRepository{
    async createLeaderBoard(LeaderBoardData: any): Promise<typeof LeaderBoardWithBase>{
      try {
          const leaderBoard: any = await LeaderBoardWithBase.create([{
            isActive: LeaderBoardData.isActive,
            isDelete: LeaderBoardData.isDelete,
            userId: new mongoose.Types.ObjectId(LeaderBoardData.userId),
            xp: LeaderBoardData.xp
          }]);           
          return leaderBoard[0];
        } catch (error: any) {
          throw new Error(
            "Error at createLeaderBoard in LeaderBoardRepository: " + error.message
          );
        }
    }
    async getLeaderBoardById(LeaderBoardData: any): Promise<typeof LeaderBoardWithBase>{
      try {
        const query: any = {
          _id: new mongoose.Types.ObjectId(LeaderBoardData._id),
          isDelete: LeaderBoardData.isDelete,
          isActive: LeaderBoardData.isActive,
        };
        const leaderBoard: typeof LeaderBoardWithBase[] = await LeaderBoardWithBase.find(query);
        return leaderBoard[0];
      } catch (error: any) {
        throw new Error(
          "Error at getLeaderBoardById in LeaderBoardRepository: " + error.meesage
        );
      }
    }
    async updateLeaderBoardById(queryData: any, queryUpdateData: any){
      try {
        const query: any = {
          _id: new mongoose.Types.ObjectId(queryData._id),
          isActive: queryData.isActive,
          isDelete: queryData.isDelete
        };
        await LeaderBoardWithBase.updateOne(query, queryUpdateData);
      } catch (error: any) {
        throw new Error(
          "Error at updateLeaderBoardById in LeaderBoardRepository: " + error.meesage
        );
      }
    }
    async deleteLeaderBoardById(LeaderBoardId: any){
      try {
        const query: any = {
          _id: new mongoose.Types.ObjectId(LeaderBoardId._id),
          isDelete: LeaderBoardId.isDelete,
          isActive: LeaderBoardId.isActive
        };
        await LeaderBoardWithBase.deleteOne(query);
      } catch (error: any) {
        throw new Error(
          "Error at deleteLeaderBoardById in LeaderBoardRepository: " + error.meesage
        );
      }
    }
}

export default LeaderBoardRepository;