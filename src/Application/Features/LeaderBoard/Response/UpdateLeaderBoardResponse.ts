import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class UpdateLeaderBoardResponse extends BaseResponse {
  constructor(message: string, statusCode: number, data: {}, error?: string){
    super(message, statusCode, data, error);
}
}