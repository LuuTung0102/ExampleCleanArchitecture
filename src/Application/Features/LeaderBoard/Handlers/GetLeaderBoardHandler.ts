import { GetLeaderBoardResponse } from "../Response/GetLeaderBoardResponse";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";

export async function GetLeaderBoardHandler(_id: string): Promise<GetLeaderBoardResponse|CoreException> {
    try {
      const unitOfWork: IUnitOfWork = new UnitOfWork();
      await unitOfWork.startTransaction();
      const queryData: any = {
        _id: _id,
        isDelete: false,
        isActive: true,
      }
      const leaderBoard: any = await unitOfWork.leaderBoardRepository.getLeaderBoardById(queryData);
      if (!leaderBoard) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, "Leader board not found!");
      }
      return new GetLeaderBoardResponse("Get leader board successful", StatusCodeEnums.OK_200, leaderBoard);
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}