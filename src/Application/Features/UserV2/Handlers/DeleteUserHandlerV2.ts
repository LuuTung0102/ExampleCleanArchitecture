import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

import { DeleteUserResV2 } from './../Response/DeleteUserResV2';

export async function DeleteUserHandlerV2(data: any): Promise<DeleteUserResV2 | CoreException> {
	const unitOfWork: IUnitOfWork = new UnitOfWork();
	try {
		const session = await unitOfWork.startTransaction();
		const { userId } = data;
		const userQueryData: any = {
			userId,
			isDelete: false,
			isActive: true,
		};
		const user: any = await unitOfWork.userRepositoryV2.getUserById(userQueryData);
		if (user == null) {
			return new CoreException(StatusCodeEnums.NotFound_404, `User not found!`);
		}
		const QueryData = {
			userId,
			isDelete: true,
		};
		const result: any = await unitOfWork.userRepositoryV2.deleteUserById(QueryData, session);
		await unitOfWork.commitTransaction();
		return new DeleteUserResV2('Deleted user successfully!', StatusCodeEnums.OK_200, result);
	} catch (error: any) {
		await unitOfWork.abortTransaction();
		return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
	}
}

export default DeleteUserHandlerV2;
