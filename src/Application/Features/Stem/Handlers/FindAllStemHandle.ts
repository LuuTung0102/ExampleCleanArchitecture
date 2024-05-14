import {FindAllStemResponse} from "../Response/FindAllStemResponse";
import {CoreException} from "../../../Common/Exceptions/CoreException";
import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";

export async function FindAllStemHandle(): Promise<FindAllStemResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const queryData = {
            isDelete: false,
        }
        const result: any = await unitOfWork.stemRepository.getAllStem(
            queryData
        )
        return new FindAllStemResponse(
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