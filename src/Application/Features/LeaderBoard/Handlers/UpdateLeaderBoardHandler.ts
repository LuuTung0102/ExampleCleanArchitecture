import { UpdateLeaderBoardResponse } from "../../LeaderBoard/Response/UpdateLeaderBoardResponse";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import moment, { Moment } from 'moment';


export async function UpdateLeaderBoardHandler(data: any): Promise<UpdateLeaderBoardResponse|CoreException>{
   const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const {_id, isActive, isDelete, userId, xp} = data;
        const leaderBoardQueryData: any = {
            _id: _id,
            isDelete: false,
            isActive: true,
        }
        const leaderBoard: any = await unitOfWork.leaderBoardRepository.getLeaderBoardById(leaderBoardQueryData);
        if (leaderBoard == null) {
            return new CoreException(StatusCodeEnums.InternalServerError_500 , "Leader board not found!");
        }

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

        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm'; 
        let _now: Moment;
        _now = moment(new Date(), DATE_TIME_FORMAT);

        const updateLeaderBoardQueryData: any = {
            isActive: isActive,
            isDelete: isDelete,
            updateTime: _now,
            userId: userId,
            xp: xp
        };
        const result: any = await unitOfWork.leaderBoardRepository.updateLeaderBoardById(leaderBoardQueryData, updateLeaderBoardQueryData);
        return new UpdateLeaderBoardResponse("Update Leader Board successfully!", 200, result);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}