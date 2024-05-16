import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

export class FindAllStemResponse extends BaseResponse {
    private data: {
        stems: any[],
    };
    constructor(message: string, statusCode: number, data: any[], error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            stems: data,
        };

    }
}