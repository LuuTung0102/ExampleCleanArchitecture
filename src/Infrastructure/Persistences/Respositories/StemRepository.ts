import mongoose, {ClientSession} from "mongoose";
import IStemRepository from "../../../Application/Persistences/IRepositories/IStemRepository";
import {StemWithBase} from "../../../Domain/Entities/StemEntites";


class StemRepository implements IStemRepository {
    async createStem(stemData: any, session: ClientSession): Promise<typeof StemWithBase> {
        try {
            const steam: any = await StemWithBase.create([{
                name: stemData.name,
                description: stemData.description,
                stemCode: stemData.stemCode,
                qrCode: stemData.qrCode,
                producer: stemData.producer,
                manufacturer: stemData.manufacturer,
                price: stemData.price,
                imagePath: stemData.imagePath,
                youtubeUrl: stemData.youtubeUrl,
                xp: stemData.xp,
                buyDate: stemData.buyDate
            }], {
                session,
            })
            return steam[0];


        } catch (error: any) {
            throw new Error(
                "Error at createStem in StemRepository: " + error.message
            );
        }
    }

    async deleteStemById(stemId: string, session: ClientSession): Promise<void> {
        try {
            const _id = new mongoose.Types.ObjectId(stemId);
            const stem: any = StemWithBase.findByIdAndUpdate(_id, {
                isDelete: true
            }, {
                session
            });
            return stem;
        } catch (error: any) {
            throw new Error("Error at deleteStemById in StemRepository: " + error.message);
        }
    }

    async getStemById(stemId: string, queryData: any): Promise<typeof StemWithBase | null> {
        try {
            const _id = new mongoose.Types.ObjectId(stemId);
            const stem: any = StemWithBase.findOne({
                _id,
                isDelete: queryData.isDelete
            });
            return stem;
        } catch (error: any) {
            throw new Error("Error at getStemById in StemRepository: " + error.message);
        }
    }

    async getAllStem(queryData: any): Promise<typeof StemWithBase[] | null> {
        try {
            const stems: typeof StemWithBase[] = await StemWithBase.find({
                isDelete: queryData.isDelete
            });
            return stems;
        } catch (error: any) {
            throw new Error("Error at getAllStem in StemRepository: " + error.message);
        }
    }

    async updateStemById(stemId
                             :
                             string, stemData
                             :
                             any, session
                             :
                             ClientSession
    ):
        Promise<void> {
        try {
            const _id = new mongoose.Types.ObjectId(stemId);
            const stem
                :
                any = StemWithBase.findByIdAndUpdate(
                _id,
                stemData,
                {
                    session
                }
            );
            return stem;
        } catch
            (error: any) {
            throw new Error("Error at updateStemById in StemRepository: " + error.message);
        }
    }
}

export default StemRepository;