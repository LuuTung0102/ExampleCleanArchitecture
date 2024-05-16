import {FindAllStemResponse} from "../Response/FindAllStemResponse";
import {CoreException} from "../../../Common/Exceptions/CoreException";
import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";
import {StemWithBase} from "../../../../Domain/Entities/StemEntites";

export async function FindAllStemHandle(
    data: any
): Promise<FindAllStemResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        //default pagination.
        const {
            perPage = 8,
            page = 1
        } = data


        const queryData = {
            perPage,
            page,
            isActive: true,
            isDelete: false,
        }
        const result: typeof StemWithBase[] | null = await unitOfWork.stemRepository.getAllStem(
            queryData
        )

        if (!result) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, "Stem is empty");
        }

        return new FindAllStemResponse(
            "Success",
            StatusCodeEnums.OK_200,
            result,
        )

    } catch (error: any) {
        await unitOfWork.abortTransaction()
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        )
    }
}