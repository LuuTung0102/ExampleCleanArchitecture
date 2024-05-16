import { CoreException } from '../../../Common/Exceptions/CoreException';
import { DeleteLevelResponse } from '../Response/DeleteLevelResponse';
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { GetLevelByIdResponse } from '../Response/GetLevelByIdResponse';

export async function GetLevelByIdHandler(data: any): Promise<GetLevelByIdResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        await unitOfWork.startTransaction();

        const id = data.levelId;

        const queryData: any = {
            isActive: true,
            isDelete: false,
        };

        const result: any = await unitOfWork.levelRepository.getLevelById(id, queryData);

        if (result === null)
            throw new Error('This level is not exist');
        
        const responseData = {
            level: result.level,
            xp: result.xp,
            description: result.description,
            iconPath: result.iconPath,
        }

        return new GetLevelByIdResponse('Get level information successfully', StatusCodeEnums.OK_200, responseData);
    }   
    catch (error: any){
        await unitOfWork.abortTransaction();
        throw new Error (`Error occured at GetLevelByIdHandler: ${error.message}`)
    }
}