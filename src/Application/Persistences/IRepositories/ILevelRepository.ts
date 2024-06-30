import mongoose, { ClientSession } from "mongoose";
import { LevelWithBase } from "../../../Domain/Entities/LevelEntities";

export default interface ILevelRepository {
    createLevel(createLevelData: any, session: ClientSession): Promise<typeof LevelWithBase>;
    deleteLevel(levelId: string | mongoose.Types.ObjectId, queryData: any, session: ClientSession): Promise<any>;
    getLevels(queryData: any, pagination: any): Promise<typeof LevelWithBase[] | null>;
    updateLevel(levelId: string | mongoose.Types.ObjectId, updateData: any, session: ClientSession): Promise<typeof LevelWithBase>;
    getLevelById(levelId: string | mongoose.Types.ObjectId, queryData: any): Promise<any>;
}