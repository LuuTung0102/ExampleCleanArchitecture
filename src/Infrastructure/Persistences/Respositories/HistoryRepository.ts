import { Collection, Db } from "mongodb";
import BaseRepository from "./BaseRepository";
import { History,HistoryWithBase } from "../../../Domain/Entities/HistoryEntities"; // Import entity của History
import IHistoryRepository from "../../../Application/Persistences/IRepositories/IHistoryRepository";
import { ClientSession } from "mongoose";

class HistoryRepository  implements IHistoryRepository {

  async createHistory(historyData: any, session: ClientSession): Promise<typeof HistoryWithBase> {

    try {
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
      throw new Error(
        "Error at createHistory in HistoryRepository: " + error.message
      );
    }
  }

  async getHistoryById(historyId: string): Promise<typeof HistoryWithBase> {
    throw new Error('Processing...');
  }

  async updateHistoryById(historyId: string, updateData: any, session: ClientSession): Promise<void> {
    throw new Error('Processing...');
  }

  async deleteHistoryById(historyId: string, session: ClientSession): Promise<void> {
    throw new Error('Processing...');
  }
}

export default HistoryRepository;
