import { ClientSession } from 'mongoose';
import { UserWithBase } from '../../../Domain/Entities/UserEntitesV2';

interface IUserRepositoryV2 {
	createUser(userData: any, session: ClientSession): Promise<typeof UserWithBase>;
	getUserById(userId: string, queryData: any): Promise<typeof UserWithBase>;
	updateUserById(userId: string, userData: any, session: ClientSession);
	deleteUserById(userId: string, session: ClientSession);
}

export default IUserRepositoryV2;
