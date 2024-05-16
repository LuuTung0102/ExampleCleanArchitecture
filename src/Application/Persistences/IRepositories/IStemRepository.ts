import {ClientSession} from "mongoose";
import {StemWithBase} from "../../../Domain/Entities/StemEntites";

interface IStemRepository {
    createStem(stemData: any, session: ClientSession): Promise<typeof StemWithBase>;

    getStemById(stemId: string, queryData: any): Promise<typeof StemWithBase | null>;

    getAllStem(queryData: any): Promise<typeof StemWithBase[] | null>;

    updateStemById(stemId: string, stemData: any, session: ClientSession): Promise<void>;

    deleteStemById(stemId: string, session: ClientSession): Promise<void>;
}

export default IStemRepository;