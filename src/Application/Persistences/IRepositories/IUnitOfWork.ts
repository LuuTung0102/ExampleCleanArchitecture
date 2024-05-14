import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import SessionRepository from "../../../Infrastructure/Persistences/Respositories/SessionRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";

import UserRepositoryV2 from "../../../Infrastructure/Persistences/Respositories/UserRepositoryV2";

import { IBaseUnitOfWork } from "./IBaseUnitOfWork";

export interface IUnitOfWork extends IBaseUnitOfWork{
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;

    userRepositoryV2: UserRepositoryV2;
}