import {DeleteStemResponse} from "../Response/DeleteStemResponse";
import {CoreException} from "../../../Common/Exceptions/CoreException";
import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";

export async function DeleteStemHandle(
    data: any
): Promise<DeleteStemResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const {stemId, userId} = data

        const session = await unitOfWork.startTransaction()

        const result: any = await unitOfWork.stemRepository.deleteStemById(
            stemId,
            session
        ) // Just change isDelete to True -> Not delete record.

        // console.log("Result", result)

        await unitOfWork.commitTransaction()

        return new DeleteStemResponse(
            "Delete Successful",
            StatusCodeEnums.OK_200,
            result
        )
    } catch (error: any) {
        await unitOfWork.abortTransaction()
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        )
    }
}