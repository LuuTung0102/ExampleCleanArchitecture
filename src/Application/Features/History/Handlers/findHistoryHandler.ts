import { findHistoryResponse } from './../Response/findHistoryResponse';

import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function findHistoryHandler(data: any): Promise<findHistoryResponse | CoreException> {
	const unitOfWork: IUnitOfWork = new UnitOfWork();

	try {
		const session = await unitOfWork.startTransaction();
		const { 
            historyId,
        } = data;

		const userQueryData: any = {
			historyId,
			isDelete: false,
		};
		const history: any = await unitOfWork.historyRepository.getHistoryById(userQueryData);
        
		if (history == null) {
			return new CoreException(StatusCodeEnums.NotFound_404, 'Not found!');
		}
		await unitOfWork.commitTransaction();

		return new findHistoryResponse(
            'Founded History!', 
            StatusCodeEnums.OK_200,
            history,
        );

	} catch (error: any) {
		await unitOfWork.abortTransaction();
		return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
	}
}

export default findHistoryHandler;