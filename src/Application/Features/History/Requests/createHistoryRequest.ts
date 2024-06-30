import { ObjectId } from "mongodb";

export class createHistoryRequest {
    public userId: ObjectId;
    public stemId: ObjectId;
    public stemName: string;
    public xp_gain_amount: number;
    public xp_gain_date: Date;
    public stemImagePath: string;
}
