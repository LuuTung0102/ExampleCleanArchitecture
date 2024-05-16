import {IUnitOfWork} from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import {BaseUnitOfWork} from "./BaseUnitOfWork";
import RoleRepository from "./RoleRepository";
import SessionRepository from "./SessionRepository";
import UserRepository from "./UserRepository";
import StemRepository from "./StemRepository";
import CategoryRepository from "./CategoryRepository";

export class UnitOfWork extends BaseUnitOfWork implements IUnitOfWork {
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    stemRepository: StemRepository;
    categoryRepository: CategoryRepository;


    constructor() {
        super();
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
        this.sessionRepository = new SessionRepository();
        this.stemRepository = new StemRepository();
        this.categoryRepository = new CategoryRepository();
    }
}