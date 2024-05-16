import { updateHistoryResponse } from '../Response/updateHistoryResponse';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function updateHistoryHandler(data: any): Promise<updateHistoryResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try { 
        const session = await unitOfWork.startTransaction()
        const {

            historyId,
            stemName,
            stemImagePath,
            
        } = data

        const userQueryData: any = {
			historyId,
			isDelete: false,
		};
		const history: any = await unitOfWork.historyRepository.getHistoryById(userQueryData);
        
		if (history == null) {
			return new CoreException(StatusCodeEnums.NotFound_404, 'Not found!');
		}

        const QueryData = {historyId, stemName, stemImagePath};

		const result: any = await unitOfWork.historyRepository.updateHistoryById(QueryData, session);   
		await unitOfWork.commitTransaction();
        await unitOfWork.commitTransaction()

        return new updateHistoryResponse(
            "Create successful",
            StatusCodeEnums.OK_200,
            result
        );

    } catch (error: any) {
        await unitOfWork.abortTransaction()
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        )
    }
}