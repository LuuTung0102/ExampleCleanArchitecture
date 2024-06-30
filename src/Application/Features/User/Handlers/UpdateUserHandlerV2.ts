import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { UpdateUserResponse } from "../Response/UpdateUserResponse";

export async function UpdateUserHandlerV2(data: any): Promise<UpdateUserResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const id = data.id;

        const updateUserData: any = {
            fullname: data.fullname,
            password: data.password
        }
        
        const result: any = await unitOfWork.userRepositoryV2.updateUserById(id, updateUserData, session);
        
        await unitOfWork.commitTransaction();

        return new UpdateUserResponse("Successful", StatusCodeEnums.OK_200, result);
    } catch(err: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, err.mesagge);
    }
}