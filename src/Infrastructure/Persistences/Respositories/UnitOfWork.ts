import { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import { BaseUnitOfWork } from "./BaseUnitOfWork";
import LevelRepository from "./LevelRepository";
import RoleRepository from "./RoleRepository";
import SessionRepository from "./SessionRepository";
import UserRepository from "./UserRepository";
import HistoryRepository from "./HistoryRepository";
import StemRepository from "./StemRepository";
import CategoryRepository from "./CategoryRepository";
import UserRepositoryV2 from "./UserRepositoryV2";

export class UnitOfWork extends BaseUnitOfWork implements IUnitOfWork {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
  roleRepository: RoleRepository;
    historyRepository: HistoryRepository
  levelRepository: LevelRepository;

  stemRepository: StemRepository;
  categoryRepository: CategoryRepository;

  userRepositoryV2: UserRepositoryV2;
  constructor() {
    super();
        this.historyRepository = new HistoryRepository();
    this.userRepository = new UserRepository();
    this.roleRepository = new RoleRepository();
    this.sessionRepository = new SessionRepository();
    this.levelRepository = new LevelRepository();
    this.stemRepository = new StemRepository();
    this.categoryRepository = new CategoryRepository();
    this.userRepositoryV2 = new UserRepositoryV2();
  }
}
