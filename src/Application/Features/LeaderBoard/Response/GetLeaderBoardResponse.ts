import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class GetLeaderBoardResponse extends BaseResponse {
  private data: {
    _id: string;
    createTime: Date;
    updateTime: Date;
    isActive: boolean;
    isDelete: boolean;
    userId: Types.ObjectId;
    xp: number;
  };
  constructor(
    message: string,
    statusCode: number,
    data: {
        _id: string;
        createTime: Date;
        updateTime: Date;
        isActive: boolean;
        isDelete: boolean;
        userId: Types.ObjectId;
        xp: number;
    },
    error?: string
  ) {
    super(message, statusCode, data, error);
    this.data = {
        _id: data._id,
        createTime: data.createTime,
        updateTime: data.updateTime,
        isActive: data.isActive,
        isDelete: data.isDelete,
        userId: data.userId,
        xp: data.xp
    };
  }
}
