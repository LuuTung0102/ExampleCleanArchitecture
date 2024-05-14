import {CoreException} from "../../../Common/Exceptions/CoreException";
import {CreateStemResponse} from "../Response/CreateStemResponse";
import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";

export async function CreateStemHandle(data: any): Promise<CreateStemResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const session = await unitOfWork.startTransaction()
        const {
            userId,
            name,
            description,
            imagePath,
            stemCode,
            qrCode,
            manufacture,
            price,
            producer,
            type,
            youtubeUrl,
            buyDate,
            xp
        } = data

        const createStemData = {
            userId,
            name,
            description,
            imagePath,
            stemCode,
            qrCode,
            manufacture,
            price,
            producer,
            type,
            youtubeUrl,
            buyDate,
            xp
        }

        const result = await unitOfWork.stemRepository.createStem(
            createStemData,
            session
        )
        await unitOfWork.commitTransaction()

        return new CreateStemResponse(
            "Successful",
            StatusCodeEnums.OK_200,
            result
        );

    } catch (error: any) {
        await unitOfWork.abortTransaction()
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        )
    }
}