import {CoreException} from "../../../Common/Exceptions/CoreException";
import { CreateCategoryResponse } from "../Responses/CreateCategoryResponse";
import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";

export async function CreateCategoryHandle(data: any): Promise<CreateCategoryResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const session = await unitOfWork.startTransaction()
        const {
            userId,
            stems,
        } = data

        const createCategoryData = {
            userId,
            stems,
        }

        const result = await unitOfWork.categoryRepository.createCategory(
            createCategoryData,
            session,
        )
        await unitOfWork.commitTransaction()

        return new CreateCategoryResponse(
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