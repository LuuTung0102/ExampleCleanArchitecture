
import { History,HistoryWithBase } from "../../../Domain/Entities/HistoryEntities"; // Import entity của History
import IHistoryRepository from "../../../Application/Persistences/IRepositories/IHistoryRepository";
// import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
// import IUserRepository from "../../../Application/Persistences/IRepositories/IUserRepository";
// import IStemRepository from "../../../Application/Persistences/IRepositories/IStemRepository";
// import {StemWithBase} from "../../../Domain/Entities/StemEntites";
import mongoose,{ ClientSession } from "mongoose";

class HistoryRepository  implements IHistoryRepository {

  async createHistory(historyData: any, session: ClientSession): Promise<typeof HistoryWithBase> {

    try {

      // // Kiểm tra tính hợp lệ của userId và stemId
      // const isUserIdValid = await UserWithBase.findById(historyData.userId);
      // const isStemIdValid = await StemWithBase.findById(historyData.stemId);

      // if (!isUserIdValid || !isStemIdValid) {
      //     throw new Error("Invalid userId or stemId");
      // }

      const history: any = await HistoryWithBase.create([{
        userId: historyData.userId,
        stemId: historyData.stemId,
        stemName: historyData.stemName,
        xp_gain_amount: historyData.xp_gain_amount,
        xp_gain_date: historyData.xp_gain_date,
        stemImagePath: historyData.stemImagePath,

      }], {session});

      return history[0];

    } catch (error: any) {

      throw new Error( "Error at createHistory in HistoryRepository: " + error.message);

    }
  }

  async getHistoryById(historyId: string, queryData: any): Promise<typeof HistoryWithBase> {
    try {

      const query : any = {
        _id: new mongoose.Types.ObjectId(historyId),
        isDelete: queryData.isDelete,
      };

      const history:  typeof HistoryWithBase[] = await HistoryWithBase.find(query);

      return history[0];  

      } catch (error: any) {
        throw new Error("Error at getHistoryById in HistoryRepository: " + error.message);
      }
  }

  async updateHistoryById(updateData: any, session: ClientSession): Promise<void> {
    try{
      const _id = new mongoose.Types.ObjectId(updateData.historyId);
      const history: any = await HistoryWithBase.findByIdAndUpdate(_id, {

        userId: updateData.userId,
        stemId: updateData.stemId,
        stemName: updateData.stemName,
        xp_gain_amount: updateData.xp_gain_amount,
        xp_gain_date: updateData.xp_gain_date,
        stemImagePath: updateData.stemImagePath,

      } ,{session}); 

    } catch (error: any){
      throw new Error("Error at updateHistoryById in HistoryRepository: " + error.message);
    }
  }

  async deleteHistoryById(historyId: string): Promise<void> {
     try {
            const _id = new mongoose.Types.ObjectId(historyId);
            const history: any = await HistoryWithBase.findOneAndDelete(_id);

            // return history;
        } catch (error: any) {
            throw new Error("Error at deleteHistoryById in HistoryRepository: " + error.message);
        }
  }
}

export default HistoryRepository;
