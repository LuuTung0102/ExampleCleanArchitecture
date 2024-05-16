import { CoreException } from '../../../Common/Exceptions/CoreException';
import { GetLevelsResponse } from '../Response/GetLevelsResponse';
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";

export async function GetLevelsHandler(): Promise<GetLevelsResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        await unitOfWork.startTransaction();

        const queryData: any = {
            isActive: true,
            isDelete: false,
        };

        const result: any = await unitOfWork.levelRepository.getLevels(queryData);

        return new GetLevelsResponse('Get level list successful', StatusCodeEnums.OK_200, result);
    }   
    catch (error: any){
        await unitOfWork.abortTransaction();
        throw new Error (`Error occured at GetLevelsHandler: ${error.message}`)
    }
}