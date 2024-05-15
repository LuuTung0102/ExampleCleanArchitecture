import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

import { UpdateUserResV2 } from '../Response/UpdateUserResV2';

export async function UpdateUserHandlerV2(data: any): Promise<UpdateUserResV2 | CoreException> {
	const unitOfWork: IUnitOfWork = new UnitOfWork();
	try {
		const session = await unitOfWork.startTransaction();
		const { userId, fullname } = data;
		const userQueryData: any = {
			userId,
			isDelete: false,
			isActive: true,
		};
		const user: any = await unitOfWork.userRepositoryV2.getUserById(userQueryData);
		if (user == null) {
			return new CoreException(StatusCodeEnums.NotFound_404, `User not found!`);
		}
		const newUserQueryData = {
			userId,
			fullname,
		};
		const result: any = await unitOfWork.userRepositoryV2.updateUserById(newUserQueryData, session);
		await unitOfWork.commitTransaction();
		return new UpdateUserResV2('Updated user successfully!', StatusCodeEnums.OK_200, result);
	} catch (error: any) {        		
		await unitOfWork.abortTransaction();
		return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
	}
}

export default UpdateUserHandlerV2;
