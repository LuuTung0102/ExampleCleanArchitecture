import {IUnitOfWork} from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import {BaseUnitOfWork} from "./BaseUnitOfWork";
import RoleRepository from "./RoleRepository";
import SessionRepository from "./SessionRepository";
import UserRepository from "./UserRepository";
import StemRepository from "./StemRepository";
import CategoryRepository from "./CategoryRepository";
import UserRepositoryV2 from "./UserRepositoryV2";

export class UnitOfWork extends BaseUnitOfWork implements IUnitOfWork {
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    stemRepository: StemRepository;
    categoryRepository: CategoryRepository;


    userRepositoryV2: UserRepositoryV2;
    constructor() {
        super();
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
        this.sessionRepository = new SessionRepository();
        this.stemRepository = new StemRepository();
        this.categoryRepository = new CategoryRepository();
        this.userRepositoryV2 = new UserRepositoryV2();
    }
}