import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

export class createHistoryResponse extends BaseResponse {
    private historyData: any

    constructor(message: string, statusCode: number, historyData: {}, error?: string) {
        super(message, statusCode, historyData, error);
        this.historyData = historyData
    }
    
    //get

    //set
}