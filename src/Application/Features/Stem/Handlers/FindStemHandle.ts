import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {CoreException} from "../../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";

export async function FindStemHandle(
    data: any
) {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const {stemId} = data
        const session = unitOfWork.startTransaction()

        const result = unitOfWork.stemRepository.getStemById(
            stemId,
            session
        )

    } catch (error: any) {
        await unitOfWork.abortTransaction()
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        )
    }
}