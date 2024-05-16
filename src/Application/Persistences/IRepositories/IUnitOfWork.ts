import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import SessionRepository from "../../../Infrastructure/Persistences/Respositories/SessionRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";
import LevelRepository from "../../../Infrastructure/Persistences/Respositories/LevelRepository"; //

export interface IUnitOfWork extends IBaseUnitOfWork{
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    levelRepository: LevelRepository; //
}