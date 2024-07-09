import { Types } from "mongoose";
import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

export class CreateCategoryResponse extends BaseResponse {
    private data: {
        _id: string;
        userId: string;
        stems: Array<Types.ObjectId>;
        createTime: Date;
        updateTime: Date;
        isActive: boolean;
        isDeleted: boolean;
        isApproved: boolean;
    };
    constructor(message: string, statusCode: number, data: {
        _id: string;
        userId: string;
        stems: Array<Types.ObjectId>;
        createTime: Date;
        updateTime: Date;
        isActive: boolean;
        isDeleted: boolean;
        isApproved: boolean;
    }, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            userId: data.userId,
            stems: data.stems,
            createTime: data.createTime,
            updateTime: data.updateTime,
            isActive: data.isActive,
            isDeleted: data.isDeleted,
            isApproved: data.isApproved
        }
    }
}