import { Types } from "mongoose";
import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

export class GetAllCategoryResponse extends BaseResponse {
    private data: {
        _id: string;
        userId: string;
        stems: Array<Types.ObjectId>;
        createTime: Date;
        updateTime: Date;
        isActive: boolean;
        isDeleted: boolean;
        isApproved: boolean;
    }[];
    constructor(message: string, statusCode: number, data: {
        _id: string;
        userId: string;
        stems: Array<Types.ObjectId>;
        createTime: Date;
        updateTime: Date;
        isActive: boolean;
        isDeleted: boolean;
        isApproved: boolean;
    }[], error?: string) {
        super(message, statusCode, data, error);
        this.data = data.map(category => ({
            _id: category._id,
            userId: category.userId,
            stems: category.stems,
            createTime: category.createTime,
            updateTime: category.updateTime,
            isActive: category.isActive,
            isDeleted: category.isDeleted,
            isApproved: category.isApproved
        })) 
    }
}