import { CoreException } from '../../../Common/Exceptions/CoreException';
import { GetLevelsResponse } from '../Response/GetLevelsResponse';
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";

export async function GetLevelsHandler(page?: any, perPage?: any): Promise<GetLevelsResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        await unitOfWork.startTransaction();

        const queryData: any = {
            isActive: true,
            isDelete: false,
        };

        const pagination = { page: page as number, perPage: perPage as number};

        const result: any = await unitOfWork.levelRepository.getLevels(queryData, pagination);

        return new GetLevelsResponse('Get level list successful', StatusCodeEnums.OK_200, result);
    }   
    catch (error: any){
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at GetLevelsHandler: ${error.message}`);
    }
}