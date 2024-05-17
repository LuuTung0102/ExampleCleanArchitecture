import mongoose, {ClientSession} from "mongoose";
import IStemRepository from "../../../Application/Persistences/IRepositories/IStemRepository";
import {StemWithBase} from "../../../Domain/Entities/StemEntites";


class StemRepository implements IStemRepository {
    async createStem(stemData: any, session: ClientSession): Promise<typeof StemWithBase> {
        try {
            const stem: any = await StemWithBase.create([{
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
            return stem;
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

    async getAllStem(queryData: any): Promise<any> {
        try {
            const {
                perPage,
                page,
                isDelete,
                isActive
            } = queryData

            const totalStems: number = await StemWithBase.countDocuments({
                isActive: isActive,
                isDelete: isDelete
            })
            const totalPages = Math.ceil(totalStems / perPage)

            const stems: any = await StemWithBase.find({
                isActive: isActive,
                isDelete: isDelete
            })
                .limit(perPage)
                .skip((page - 1) * perPage);
            return {
                totalStems,
                totalPages,
                currentPage: page,
                stems
            }
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
            // console.log(_id)
            console.log("StemData", stemData)
            const stem
                :
                any = await StemWithBase.findByIdAndUpdate(
                {
                    _id: _id
                },
                {
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
                    buyDate: stemData.buyDate,
                    isDelete: stemData.isDelete,
                    isActive: stemData.isActive
                },
                {
                    new: true,
                    session
                }
            )
            // console.log("Stem: ", stem)
            return stem;
        } catch
            (error: any) {
            throw new Error("Error at updateStemById in StemRepository: " + error.message);
        }
    }
}

export default StemRepository;