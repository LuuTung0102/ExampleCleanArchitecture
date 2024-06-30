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
                // role_id: userData.role_id,
            }], {session});

            console.log(user)
      
            return user[0];
        } catch(err: any) {
            throw new Error("Error at createUser in UserRepositoryV2: " + err.message);
        }
    }

    async updateUserById(userId: string, userData: any, session: mongoose.mongo.ClientSession) {
        try {
            const hashedPassword = await hashPassword(userData.password);

            const query: any = {
              _id: new mongoose.Types.ObjectId(userId)
            };
                    
            const updateData: any = {
                fullname: userData.fullname,
                password: hashedPassword
            };
            
            await UserWithBaseV2.updateOne(query, updateData, {session});
        } catch(err: any) {
            throw new Error("Error at createUser in UserRepositoryV2: " + err.message);
        }
    }

    getUserById(userId: string, queryData: any): Promise<typeof UserWithBaseV2>  {
        throw new Error('Method not implemented.');
    }
    deleteUserById(userId: string, session: mongoose.mongo.ClientSession) {
        throw new Error('Method not implemented.');
    }
}

export default UserRepositoryV2;
