import { deleteHistoryResponse } from './../Response/deleteHistoryResponse';

import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function deleteHistoryHandler(historyId: string): Promise<deleteHistoryResponse | CoreException> {
	const unitOfWork: IUnitOfWork = new UnitOfWork();
	try {
		const session = await unitOfWork.startTransaction();

		const userQueryData: any = {
			isDelete: false,
		};
		const history: any = await unitOfWork.historyRepository.getHistoryById(historyId,userQueryData);
        
		if (!history) {
			return new CoreException(StatusCodeEnums.NotFound_404, 'Not found History!');
		}
		const QueryData = historyId;

		const result: any = await unitOfWork.historyRepository.deleteHistoryById(QueryData);   
		await unitOfWork.commitTransaction();

		return new deleteHistoryResponse(
            'Deleted!', 
            StatusCodeEnums.OK_200,
            result
        );

	} catch (error: any) {
		await unitOfWork.abortTransaction();
		return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
	}
}

export default deleteHistoryHandler;