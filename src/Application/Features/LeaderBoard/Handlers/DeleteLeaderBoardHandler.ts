import { DeleteLeaderBoardResponse } from "../../LeaderBoard/Response/DeleteLeaderBoardResponse";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";

export async function DeleteLeaderBoardHandler(_id: string): Promise<DeleteLeaderBoardResponse|CoreException>{
   const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const leaderBoardQueryData: any = {
            _id: _id,
            isDelete: false,
            isActive: true,
        }
        const leaderBoard: any = await unitOfWork.leaderBoardRepository.getLeaderBoardById(leaderBoardQueryData);
        if (leaderBoard == null) {
            return new CoreException(StatusCodeEnums.InternalServerError_500 , "Leader Board not found!");
        }

        const result: any = await unitOfWork.leaderBoardRepository.deleteLeaderBoardById(leaderBoardQueryData);
        return new DeleteLeaderBoardResponse("Delete Leader Board successfully!", 200, result);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}