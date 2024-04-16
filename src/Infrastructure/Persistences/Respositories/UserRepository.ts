import { Collection, Db } from "mongodb";
import BaseRepository from "./BaseRepository";
import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
import IUserRepository from "../../../Application/Persistences/IRepositories/IUserRepository";
import mongoose from "mongoose";
class UserRepository extends BaseRepository<User> implements IUserRepository{
    constructor(){
        const collectionName: string = "users";
        super(collectionName);
    }
    async getUserByEmail(email: string, queryData: UserWithBase): Promise<UserWithBase> {
        try {
            const query = {email: email, isDelete: queryData.isIsDelete, isActive: queryData.isIsActive ,emailConfirmed: queryData.isEmailConfirmed};
            const users: UserWithBase[] = await this.findDocuments(query, null, {});
            if (users === null || users.length <= 0) {
                throw new Error('No user found!');
            }
            return users[0];
        } catch (error) {
            throw new Error('Error getting user by email: ' + error.message);
        }
    }
    
    async getUserSession() {
        return sessionStorage;
    }
//     constructor() {
//         const collectionName: string = "User";
//         super(collectionName);
//     }
//     // public userRepository;
//     // public UserRepository() {
//     //     this.userRepository = new UserRepository(this.collection);
//     // }
//     async createUser(user: User): Promise<void>{
//         try {
//             const result = await this.insertDocuments(user);
//             console.log(result);
//         } catch (error) {
//             throw error;
//         }
//     }
//     async getAllUser(): Promise<User[]> {
//         try {
//             const query = {};
//             const result: User[] = await this.findDocuments(query, null, {});
//             console.log(result);
//             return result
//         } catch (error) {
//             throw error;
//         }
//     }
//     async updateUser(user: User): Promise<void>{
//         try {
//             const user = await this.findUser("b");
//             user[0].fullname = "asjkmndasjkdhasjkhd";
//             const id = user[0]._id
//             const query = {_id: id};
//             await this.updateDocument(query, user[0]);
//         } catch (error) {
//             throw error;
//         }
//     }
//     async findUser(userName: string): Promise<User[]> {
//         try {
//             const query = {fullname: userName};
//             const result: User[] = await this.findDocuments(query, null, {});
//             return result;
            
//         } catch (error) {
//             throw error;
//         }
//     }

//     async deleteUser(userId: string): Promise<void> {
//         try {
//             const id = new mongoose.Types.ObjectId(userId);
//             const query = {_id: id}
//             await this.deleteDocument(query);
//         } catch (error) {
//             throw error;
//         }
//     }
}


export default UserRepository
 