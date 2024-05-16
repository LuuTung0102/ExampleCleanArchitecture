import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import SessionRepository from "../../../Infrastructure/Persistences/Respositories/SessionRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import HistoryRepository from "../../../Infrastructure/Persistences/Respositories/HistoryRepository";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";

export interface IUnitOfWork extends IBaseUnitOfWork{
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    
    historyRepository: HistoryRepository;
}