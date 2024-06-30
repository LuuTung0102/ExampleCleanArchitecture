import { ClientSession } from 'mongoose';
import { UserWithBaseV2 } from '../../../Domain/Entities/UserEntitesV2';

interface IUserRepositoryV2 {
	createUser(userData: any, session: ClientSession): Promise<typeof UserWithBaseV2>;
	getUserById(userId: string, queryData: any): Promise<typeof UserWithBaseV2>;
	updateUserById(userId: string, userData: any, session: ClientSession);
	deleteUserById(userId: string, session: ClientSession);
}

export default IUserRepositoryV2;
