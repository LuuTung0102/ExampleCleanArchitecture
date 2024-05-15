import { CoreException } from '../../../Common/Exceptions/CoreException';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

import { ReadUserResV2 } from './../Response/ReadUserResV2';

export async function ReadUserHandlerV2(userId: string): Promise<ReadUserResV2 | CoreException> {
	try {
		const unitOfWork: IUnitOfWork = new UnitOfWork();
		await unitOfWork.startTransaction();
		const queryData: any = {
			userId,
			isDelete: false,
			isActive: true,
		};
		const userProfile: any = await unitOfWork.userRepositoryV2.getUserById(queryData);
		if (!userProfile) {
			return new CoreException(StatusCodeEnums.InternalServerError_500, 'User not found!');
		}
		return new ReadUserResV2('Get user successful', StatusCodeEnums.OK_200, userProfile);
	} catch (error: any) {
		return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
	}
}
