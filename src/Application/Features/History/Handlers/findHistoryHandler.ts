import { findHistoryResponse } from './../Response/findHistoryResponse';

import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function findHistoryHandler(historyId: string, data: any): Promise<findHistoryResponse | CoreException> {
	const unitOfWork: IUnitOfWork = new UnitOfWork();

	try {
		const session = await unitOfWork.startTransaction();

		const history: any = await unitOfWork.historyRepository.getHistoryById(historyId,data);
        
		if (!history) {
			return new CoreException(StatusCodeEnums.NotFound_404, 'loi o handler, not found history');
		}
		await unitOfWork.commitTransaction();
		var  temp = history
		return new findHistoryResponse(
            'Founded History!', 
            StatusCodeEnums.OK_200,
            history,
        );

	} catch (error: any) {
		await unitOfWork.abortTransaction();
		return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
	}
}

export default findHistoryHandler;