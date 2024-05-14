import mongoose from "mongoose";

import { UserWithBase } from "../../../Domain/Entities/UserEntitesV2";
import IUserRepositoryV2 from '../../../Application/Persistences/IRepositories/IUserRepositoryV2';


class UserRepositoryV2 implements IUserRepositoryV2 {
    createUser(userData: any, session: mongoose.mongo.ClientSession): Promise<typeof UserWithBase>  {
        throw new Error('Method not implemented.');
    }
    getUserById(userId: string, queryData: any): Promise<typeof UserWithBase>  {
        throw new Error('Method not implemented.');
    }
    updateUserById(userId: string, userData: any, session: mongoose.mongo.ClientSession) {
        throw new Error('Method not implemented.');
    }
    deleteUserById(userId: string, session: mongoose.mongo.ClientSession) {
        throw new Error('Method not implemented.');
    }
}

export default UserRepositoryV2;
