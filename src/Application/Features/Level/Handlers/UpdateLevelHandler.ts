import { CoreException } from '../../../Common/Exceptions/CoreException';
import { CreateLevelResponse } from '../Response/CreateLevelResponse';
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";

export async function UpdateLevelHandler(id: any, updateData: any): Promise<CreateLevelResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();

        const { level, xp, description, iconPath }  = updateData;

        const updateLevelData: { level?: number, xp?: number, description?: string, iconPath?: string} = {
            level, xp, description, iconPath
        }

        const result = await unitOfWork.levelRepository.updateLevel(id, updateLevelData, session);

        await unitOfWork.commitTransaction();

        //console.log(result)

        return new CreateLevelResponse('Updated level successful', StatusCodeEnums.OK_200, result);
    }   
    catch (error: any){
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at UpdateLevelHandler: ${error.message}`);
    }
}