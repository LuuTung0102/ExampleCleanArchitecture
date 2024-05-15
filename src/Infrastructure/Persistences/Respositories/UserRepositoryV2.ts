import mongoose from "mongoose";

import { UserWithBaseV2 } from "../../../Domain/Entities/UserEntitesV2";
import IUserRepositoryV2 from '../../../Application/Persistences/IRepositories/IUserRepositoryV2';
import { hashPassword } from "../../../Application/Common/Helpers/passwordUtils";


class UserRepositoryV2 implements IUserRepositoryV2 {
    async createUser(userData: any, session: mongoose.mongo.ClientSession): Promise<typeof UserWithBaseV2>  {
        try {
            const hashedPassword = await hashPassword(userData.password);

            const user: any = await UserWithBaseV2.create([{
                fullname: userData.fullname,
                password: hashedPassword,
                role_id: userData.role_id,
            }], {session});
      
            return user[0];
        } catch(err: any) {
            throw new Error("Error at createUser in UserRepositoryV2: " + err.message);
        }
    }
    getUserById(userId: string, queryData: any): Promise<typeof UserWithBaseV2>  {
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
