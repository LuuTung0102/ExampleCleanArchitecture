import { CoreException } from '../../../Common/Exceptions/CoreException';
import { DeleteLevelResponse } from '../Response/DeleteLevelResponse';
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";

export async function DeleteLevelByIdHandler(data: any): Promise<DeleteLevelResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();

        const id = data.id;

        const queryData: any = {
            isActive: true,
            isDelete: false,
        };

        const result = await unitOfWork.levelRepository.deleteLevel(id, queryData, session);

        if (result === null)
            throw new Error('This level is not exist');

        await unitOfWork.commitTransaction();

        return new DeleteLevelResponse('Delete level successful', StatusCodeEnums.OK_200, {});
    }   
    catch (error: any){
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at DeleteLevelHandler: ${error.message}`);
    }
}