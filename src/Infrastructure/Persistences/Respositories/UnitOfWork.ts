import { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import { BaseUnitOfWork } from "./BaseUnitOfWork";
import LevelRepository from "./LevelRepository";
import RoleRepository from "./RoleRepository";
import SessionRepository from "./SessionRepository";
import UserRepository from "./UserRepository";

export class UnitOfWork extends BaseUnitOfWork implements IUnitOfWork {
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    levelRepository: LevelRepository; 
 
    constructor() {
        super();
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
        this.sessionRepository = new SessionRepository();
        this.levelRepository = new LevelRepository(); 
    }
}