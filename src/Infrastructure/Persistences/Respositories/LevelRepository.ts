import ILevelRepository from "../../../Application/Persistences/IRepositories/ILevelRepository";
import mongoose, { ClientSession } from "mongoose";
import { Level, LevelWithBase } from '../../../Domain/Entities/LevelEntities';

//xong class này thì qua code interface của nó
export default class LevelRepository implements ILevelRepository {
    async createLevel(createLevelData: any, session: ClientSession): Promise<typeof LevelWithBase> {
        try {
            const levelWithBase: any = await LevelWithBase.create([createLevelData], {session});

            return levelWithBase;
        }
        catch (error: any) {
            throw new Error (`Error at createLevel in LevelRepository: ${error.message}`);
        }
    }

    async deleteLevel(levelId: string | mongoose.Types.ObjectId, queryData: any, session: ClientSession): Promise<any> {
        try {
            levelId = new mongoose.Types.ObjectId(levelId);

            const query = {
                _id: levelId, 
                isActive: queryData.isActive,
                isDelete: queryData.isDelete,
            }

            const update = {
                isDelete: true, //Soft delete
                updateTime: Date.now(),
            }
             
            const level: any = await LevelWithBase.findOneAndUpdate(query, update, {session})

            if (!level)
                throw new Error(`This level is not exist`);

            return level;
        }
        catch (error: any) {
            throw new Error(`Error at deleteLevel in LevelRepository: ${error.message}`)
        }
    }

    async getLevels(queryData: any, pagination: any): Promise<typeof LevelWithBase[] | null> {
        try {
            const page: number = pagination?.page ||  1; 
            const perPage: number = pagination?.perPage ||  10; 
            const skip: number = perPage * page - perPage; // In first page, skip 0 index
            const showOptions: any = { _id: 1, level: 1, xp : 1, description: 1, iconPath: 1 };

            const levels: typeof LevelWithBase[] = await LevelWithBase.find(queryData, null, { limit: perPage, skip: skip }).select(showOptions); //.sort({ name: 1 });

            if (!levels) return null;

            return levels;
        }
        catch (error: any) {
            throw new Error(`Error at getLevels in LevelRepository: ${error.message}`)
        }
    }

    async updateLevel(levelId: string | mongoose.Types.ObjectId, updateData: any, session: ClientSession): Promise<typeof LevelWithBase> {
        try {
            levelId = new mongoose.Types.ObjectId(levelId);

            const query = {
                _id: levelId, 
                isActive: true,
                isDelete: false,
            }

            const update = {
                ...updateData,
                updateTime: Date.now(),
            }
             
            const level: any = await LevelWithBase.findOneAndUpdate(query, update, {session})

            if (!level)
                throw new Error(`This level is not exist`);

            return level;
        }
        catch (error: any) {
            throw new Error(`Error at getLevels in LevelRepository: ${error.message}`);

        }
    }

    async getLevelById(levelId: string | mongoose.Types.ObjectId, queryData: any): Promise<any> {
        try {   
            levelId = new mongoose.Types.ObjectId(levelId);

            const query = {
                _id: levelId,
                isActive: queryData.isActive,
                isDelete: queryData.isDelete,
            }

            const level: any = await LevelWithBase.findOne(query);

            return level;
        }
        catch (error: any) {
            throw new Error(`Error at getLevelById in LevelRepository: ${error.message}`);
        }
    }
}