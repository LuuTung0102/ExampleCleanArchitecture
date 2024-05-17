import { CreateLeaderBoardResponse } from './../Response/CreateLeaderBoardResponse';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';
import moment, { Moment } from 'moment';

export async function CreateLeaderBoardHandler(data: any): Promise<CreateLeaderBoardResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  let _now: Moment;
  _now = moment(new Date(), 'YYYY-MM-DDTHH:mm');
  try {
    const {userId, xp} = data;
    const createLeaderBoardData: any = {
        userId: userId,
        xp: xp,
        isDelete: false,
        isActive: true,
        createAt: _now,
        updateAt: _now,
    };
    const result: any = await unitOfWork.leaderBoardRepository.createLeaderBoard(createLeaderBoardData);
    await unitOfWork.commitTransaction();
  
    return new CreateLeaderBoardResponse("Successful", StatusCodeEnums.OK_200, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
