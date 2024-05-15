import * as CreateUserResV2 from './../Response/CreateUserResV2';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function CreateUserHandlerV2(data: any): Promise<CreateUserResV2.CreateUserResV2 | CoreException> {
	const unitOfWork: IUnitOfWork = new UnitOfWork();
	try {
		const session = await unitOfWork.startTransaction();
		const { fullname, password } = data;
		const createUserData: any = { fullname, password };
		const result: any = await unitOfWork.userRepositoryV2.createUser(createUserData, session);
		await unitOfWork.commitTransaction();
		return new CreateUserResV2.CreateUserResV2('Successful', StatusCodeEnums.OK_200, result);
	} catch (error: any) {
		console.log(error);
		await unitOfWork.abortTransaction();
		return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
	}
}
