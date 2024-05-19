import { CoreException } from '../../../Common/Exceptions/CoreException';
import { CreateLevelResponse } from '../Response/CreateLevelResponse';
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";

export async function CreateLevelHandler(data: any): Promise<CreateLevelResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();

        const { level, xp, description, iconPath }  = data;

        const createLevelData: any = {
            level, xp, description, iconPath
        }

        const result = await unitOfWork.levelRepository.createLevel(createLevelData, session);

        await unitOfWork.commitTransaction();

        //console.log(result)

        return new CreateLevelResponse('Created level successful', StatusCodeEnums.Created_201, {});
    }   
    catch (error: any){
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at CreateLevelHandler: ${error.message}`);
    }
}