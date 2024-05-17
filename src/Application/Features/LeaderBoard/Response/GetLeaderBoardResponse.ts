import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class GetLeaderBoardResponse extends BaseResponse {
  private data: {
    _id: string;
    createAt: Date;
    updateAt: Date;
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
        createAt: Date;
        updateAt: Date;
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
        createAt: data.createAt,
        updateAt: data.updateAt,
        isActive: data.isActive,
        isDelete: data.isDelete,
        userId: data.userId,
        xp: data.xp
    };
  }
}
