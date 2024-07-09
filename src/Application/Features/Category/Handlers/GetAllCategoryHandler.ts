import {CoreException} from "../../../Common/Exceptions/CoreException";
import { GetAllCategoryResponse } from "../Responses/GetAllCategoryResponse";
import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";
import { CategoryWithBase } from "../../../../Domain/Entities/CategoryEntites";

export async function GetAllCategoryHandler(): Promise<GetAllCategoryResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        // const session = await unitOfWork.startTransaction()

        const queryData = {
            isDelete: false,
        }

        const result:typeof CategoryWithBase[] | any = await unitOfWork.categoryRepository.getAllCategory(
            queryData,
        )
        await unitOfWork.commitTransaction()

        if (!result) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, "Category is empty");
        }

        return new GetAllCategoryResponse(
            "Successful",
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