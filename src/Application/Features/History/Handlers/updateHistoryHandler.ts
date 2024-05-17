import { updateHistoryResponse } from '../Response/updateHistoryResponse';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function updateHistoryHandler(historyId: string, data: any): Promise<updateHistoryResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try { 
        const session = await unitOfWork.startTransaction()
        const { 

            _id = historyId,           
        } = data

        const historyQueryData: any = {
			_id : historyId,
			isDelete: false
		};
		const history: any = await unitOfWork.historyRepository.getHistoryById(historyId,historyQueryData);
        
		if (!history) {
			return new CoreException(StatusCodeEnums.NotFound_404, 'Handler: Not found!');
		}

        const QueryData = {historyId, stemName: 'newName', stemImagePath:'newName'};

		const result: any = await unitOfWork.historyRepository.updateHistoryById(_id,QueryData);   
        await unitOfWork.commitTransaction()

        return new updateHistoryResponse(
            "Update successful",
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