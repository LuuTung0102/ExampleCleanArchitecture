import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import SessionRepository from "../../../Infrastructure/Persistences/Respositories/SessionRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import LeaderBoardRepository from "../../../Infrastructure/Persistences/Respositories/LeaderBoardRepository";
import HistoryRepository from "../../../Infrastructure/Persistences/Respositories/HistoryRepository";

import UserRepositoryV2 from "../../../Infrastructure/Persistences/Respositories/UserRepositoryV2";

import { IBaseUnitOfWork } from "./IBaseUnitOfWork";
import LevelRepository from "../../../Infrastructure/Persistences/Respositories/LevelRepository"; //
import StemRepository from "../../../Infrastructure/Persistences/Respositories/StemRepository";
import CategoryRepository from "../../../Infrastructure/Persistences/Respositories/CategoryRepository";

export interface IUnitOfWork extends IBaseUnitOfWork{
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    leaderBoardRepository: LeaderBoardRepository;
    
    historyRepository: HistoryRepository;
    levelRepository: LevelRepository; //
    stemRepository: StemRepository;
    categoryRepository: CategoryRepository;

    userRepositoryV2: UserRepositoryV2;
}