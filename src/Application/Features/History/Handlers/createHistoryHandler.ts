import { createHistoryResponse } from '../Response/createHistoryResponse';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function createHistoryHandle(data: any): Promise<createHistoryResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const session = await unitOfWork.startTransaction()
        const {
            historyId,
            userId,
            stemId,
            stemName,
            xp_gain_amount,
            xp_gain_date,
            stemImagePath,
        } = data

        const createStemData = {
            historyId,
            userId,
            stemId,
            stemName,
            xp_gain_amount,
            xp_gain_date,
            stemImagePath,
        }

        const result = await unitOfWork.historyRepository.createHistory(
            createStemData, //stemData
            session // session
        )
        await unitOfWork.commitTransaction()

        return new createHistoryResponse(
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