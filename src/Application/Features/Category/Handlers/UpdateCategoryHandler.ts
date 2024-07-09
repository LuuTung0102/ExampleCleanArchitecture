import {CoreException} from "../../../Common/Exceptions/CoreException";
import { UpdateCategoryResponse } from "../Responses/UpdateCategoryResponse";
import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";

export async function UpdateCategoryHandler(CategoryData: any): Promise<UpdateCategoryResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const session = await unitOfWork.startTransaction()
        const {categoryId, userId, stems} = CategoryData

        const updateCategoryData = {userId, stems}

        const result: any = await unitOfWork.categoryRepository.updateCategoryById(
            categoryId,
            updateCategoryData,
            session,
        )
        if (!result) {
            return new CoreException(
                StatusCodeEnums.NotFound_404, "Not found stem"
            )
        }
        await unitOfWork.commitTransaction()

        return new UpdateCategoryResponse(
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