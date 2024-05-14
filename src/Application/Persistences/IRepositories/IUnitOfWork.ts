import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import SessionRepository from "../../../Infrastructure/Persistences/Respositories/SessionRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";
import StemRepository from "../../../Infrastructure/Persistences/Respositories/StemRepository";

export interface IUnitOfWork extends IBaseUnitOfWork{
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    stemRepository: StemRepository;
}