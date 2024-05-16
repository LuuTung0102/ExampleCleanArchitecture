import { deleteHistoryResponse } from './../Response/deleteHistoryResponse';

import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function deleteHistoryHandler(data: any): Promise<deleteHistoryResponse | CoreException> {
	const unitOfWork: IUnitOfWork = new UnitOfWork();
	try {
		const session = await unitOfWork.startTransaction();
		const { 
            historyId,
			stemName,
			stemImagePath,
        } = data;

		const userQueryData: any = {
			historyId,
			isDelete: false,
			isActive: true,
		};
		const history: any = await unitOfWork.historyRepository.getHistoryById(userQueryData);
        
		if (history == null) {
			return new CoreException(StatusCodeEnums.NotFound_404, 'Not found!');
		}
		const QueryData = historyId;

		const result: any = await unitOfWork.historyRepository.deleteHistoryById(QueryData, session);   
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