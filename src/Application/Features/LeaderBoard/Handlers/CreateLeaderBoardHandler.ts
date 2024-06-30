import { CreateLeaderBoardResponse } from './../Response/CreateLeaderBoardResponse';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function CreateLeaderBoardHandler(data: any): Promise<CreateLeaderBoardResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const {userId, xp} = data;
    const createLeaderBoardData: any = {
        userId: userId,
        xp: xp,
        isDelete: false,
        isActive: true,
    };
    const findUserId: any = {
      userId: userId,
      isDelete: false,
      isActive: true,
      emailConfirmed: false || true,
    }
    const userProfile: any = await unitOfWork.userRepository.getUserById(findUserId);
    if (!userProfile) {
      return new CoreException(StatusCodeEnums.InternalServerError_500, "User Id not found!");
    }
    const result: any = await unitOfWork.leaderBoardRepository.createLeaderBoard(createLeaderBoardData);
    await unitOfWork.commitTransaction();
  
    return new CreateLeaderBoardResponse("Successful", StatusCodeEnums.Created_201, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
