import { ClientSession } from 'mongoose';

import { UserWithBaseV2 } from '../../../Domain/Entities/UserEntitesV2';

interface IUserRepositoryV2 {
	createUser(userData: any, session: ClientSession): Promise<typeof UserWithBaseV2>;
	getUserById(userId: string): Promise<typeof UserWithBaseV2>;
	updateUserById(queryData: any, session: ClientSession);
	deleteUserById(queryData: any, session: ClientSession);
}

export default IUserRepositoryV2;
