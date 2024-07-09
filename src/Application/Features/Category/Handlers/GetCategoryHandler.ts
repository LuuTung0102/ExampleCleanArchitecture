import {CoreException} from "../../../Common/Exceptions/CoreException";
import { GetCategoryResponse } from "../Responses/GetCategoryResponse";
import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";

export async function GetCategoryHandler(data: any): Promise<GetCategoryResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        // const session = await unitOfWork.startTransaction()
        const {categoryId} = data

        const queryData = {
            isDelete: false,
            isActive: true,
        }

        const result: any = await unitOfWork.categoryRepository.getCategoryById(
            categoryId,
            queryData,
        )
        await unitOfWork.commitTransaction()

        return new GetCategoryResponse(
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