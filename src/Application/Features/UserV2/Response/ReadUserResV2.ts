import { BaseResponse } from '../../../Common/Model/Response/BaseResponse';

export class ReadUserResV2 extends BaseResponse {
	private data: {
		fullname: string;
	};
	constructor(message: string, statusCode: number, data: { fullname: string }, error?: string) {
		super(message, statusCode, data, error);
		this.data = { fullname: data.fullname };
	}
}
