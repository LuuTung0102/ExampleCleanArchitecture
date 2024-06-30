import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { CreateUserResponse } from "../Response/CreateUserResponse";

export async function CreateUserHandlerV2(data: any): Promise<CreateUserResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const {fullname, password} = data;

        const roleQueryData: any = {
            isDelete: false,
            isActive: true,
        }       

        const role: any = await unitOfWork.roleRepository.getRoleByName("User", roleQueryData);

        const createUserRoleData: any = {
          fullname: fullname,
          password: password,
        //   role_id: role._id
        };
        
        const result: any = await unitOfWork.userRepositoryV2.createUser(createUserRoleData, session);
        
        await unitOfWork.commitTransaction();

        return new CreateUserResponse("Successful", StatusCodeEnums.OK_200, result);
    } catch(err: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, err.mesagge);
    }
}