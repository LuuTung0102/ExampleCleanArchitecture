import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {CoreException} from "../../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";

export async function UpdateStemHandle(
    data: any
) {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const {
            stemId,
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
        const session = await unitOfWork.startTransaction()

        const updateStemData = {
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

        const result = unitOfWork.stemRepository.updateStemById(
            stemId,
            updateStemData,
            session
        )
    } catch (error: any) {
        await unitOfWork.abortTransaction()
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        )
    }
}