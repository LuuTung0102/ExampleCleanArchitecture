import { ClientSession } from "mongoose";
import { History, HistoryWithBase } from "../../../Domain/Entities/HistoryEntities";

interface IHistoryRepository {

    createHistory(historyData: any, session: ClientSession): Promise<typeof HistoryWithBase>;
    getHistoryById(historyId: string, queryData: any): Promise<typeof HistoryWithBase>;
    updateHistoryById(historyId: string, updateData: any, session: ClientSession): Promise<void>;
    deleteHistoryById(historyId: string, session: ClientSession): Promise<void>;
}

export default IHistoryRepository;
