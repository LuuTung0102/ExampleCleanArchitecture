import mongoose from 'mongoose';

import { UserWithBaseV2 } from '../../../Domain/Entities/UserEntitesV2';
import IUserRepositoryV2 from '../../../Application/Persistences/IRepositories/IUserRepositoryV2';
import { hashPassword } from '../../../Application/Common/Helpers/passwordUtils';

class UserRepositoryV2 implements IUserRepositoryV2 {
	async createUser(userData: any, session: mongoose.mongo.ClientSession): Promise<typeof UserWithBaseV2> {
		try {
			const hashedPassword = await hashPassword(userData.password);

			const user: any = await UserWithBaseV2.create(
				[
					{
						fullname: userData.fullname,
						password: hashedPassword,
					},
				],
				{ session },
			);

			return user[0];
		} catch (error: any) {
			throw new Error(`Error at createUser in UserRepositoryV2: ${error.message}`);
		}
	}
	async getUserById(queryData: any): Promise<typeof UserWithBaseV2> {
		try {
			const query: any = {
				_id: mongoose.Types.ObjectId.createFromHexString(queryData.userId),
				isDelete: queryData.isDelete,
				isActive: queryData.isActive,
			};
			const user: (typeof UserWithBaseV2)[] = await UserWithBaseV2.find(query);
			return user[0];
		} catch (error: any) {
			throw new Error(`Error at getUserById in UserRepositoryV2: ${error.meesage}`);
		}
	}
	async updateUserById(queryData: any, session: mongoose.mongo.ClientSession) {
		try {
			const _id = mongoose.Types.ObjectId.createFromHexString(queryData.userId);
			return await UserWithBaseV2.findByIdAndUpdate(
				_id,
				{
					fullname: queryData.fullname,
				},
				{ session },
			);
		} catch (error: any) {
			throw new Error(`Error at updateUserById in UserRepositoryV2: ${error.message}`);
		}
	}
	async deleteUserById(queryData: any, session: mongoose.mongo.ClientSession) {
		try {
			const _id = mongoose.Types.ObjectId.createFromHexString(queryData.userId);
			return await UserWithBaseV2.findByIdAndUpdate(
				_id,
				{
					isDelete: queryData.isDelete,
				},
				{ session },
			);
		} catch (error: any) {
			throw new Error(`Error at deleteUserById in UserRepositoryV2: ${error.message}`);
		}
	}
}

export default UserRepositoryV2;
