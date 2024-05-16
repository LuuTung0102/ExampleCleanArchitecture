import {CoreException} from "../../../Common/Exceptions/CoreException";
import { DeleteCategoryResponse } from "../Responses/DeleteCategoryResponse";
import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";

export async function DeleteCategoryHandle(data: any): Promise<DeleteCategoryResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const session = await unitOfWork.startTransaction()
        const {categoryId, stems } = data;

        if (stems.length === 0) {
            const result: any = await unitOfWork.categoryRepository.deleteCategoryById(categoryId, session);
            await unitOfWork.commitTransaction();

            return new DeleteCategoryResponse(
                "Delete Successful",
                StatusCodeEnums.OK_200,
                result
            );
        } else {
            throw new Error("Have stem left in category");
        }

    } catch (error: any) {
        await unitOfWork.abortTransaction()
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        )
    }
}