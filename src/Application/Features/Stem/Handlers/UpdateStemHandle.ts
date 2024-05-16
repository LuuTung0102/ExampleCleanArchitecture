import {IUnitOfWork} from "../../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {CoreException} from "../../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../../Domain/Enums/StatusCodeEnums";
import {UpdateStemResponse} from "../Response/UpdateStemResponse";

export async function UpdateStemHandle(
    data: any
) {
    const unitOfWork: IUnitOfWork = new UnitOfWork()
    try {
        const {
            stemId,
            // userId,
            // name,
            // description,
            // imagePath,
            // stemCode,
            // qrCode,
            // manufacture,
            // price,
            // producer,
            // type,
            // youtubeUrl,
            // buyDate,
            // xp
        } = data
        const session = await unitOfWork.startTransaction()

        console.log("Update")

        const updateStemData = {...data}
        delete updateStemData.stemId

        console.log("Update data", updateStemData)

        const result: any = await unitOfWork.stemRepository.updateStemById(
            stemId,
            updateStemData,
            session
        )
        return new UpdateStemResponse(
            "Sucess",
            StatusCodeEnums.OK_200,
            result
        )
    } catch (error: any) {
        await unitOfWork.abortTransaction()
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        )
    }
}