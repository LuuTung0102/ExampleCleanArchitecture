import { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import { BaseUnitOfWork } from "./BaseUnitOfWork";
import RoleRepository from "./RoleRepository";
import SessionRepository from "./SessionRepository";
import UserRepository from "./UserRepository";
import LeaderBoardRepository from "./LeaderBoardRepository";

export class UnitOfWork extends BaseUnitOfWork implements IUnitOfWork {
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    leaderBoardRepository: LeaderBoardRepository;
    constructor() {
        super();
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
        this.leaderBoardRepository = new LeaderBoardRepository();
        this.sessionRepository = new SessionRepository();
    }
}