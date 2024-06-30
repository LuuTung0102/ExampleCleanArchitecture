import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {CoreException} from "../../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";
import {FindStemResponse} from "../Response/FindStemResponse";

export async function FindStemHandle(
    data: any
) {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const {stemId} = data
        const session = await unitOfWork.startTransaction()

        const queryData = {
            isActive: true,
            isDelete: false,
        }

        const result: any = await unitOfWork.stemRepository.getStemById(
            stemId,
            queryData
        )

        // console.log("Result: ", result)

        if (!result) {
            return new CoreException(StatusCodeEnums.NotFound_404, "Stem not found");
        }

        return new FindStemResponse(
            "Success",
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