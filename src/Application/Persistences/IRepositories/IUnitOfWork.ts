import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import SessionRepository from "../../../Infrastructure/Persistences/Respositories/SessionRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import LeaderBoardRepository from "../../../Infrastructure/Persistences/Respositories/LeaderBoardRepository";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";

export interface IUnitOfWork extends IBaseUnitOfWork{
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    leaderBoardRepository: LeaderBoardRepository;
}