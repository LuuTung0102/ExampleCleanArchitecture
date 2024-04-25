import moment from "moment";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { ForgotPasswordResponse } from "../Response/ForgotPasswordResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
const { md5Encrypt } = require("../../../Common/Helpers/passwordUtils");
const { sendMail } = require("../../../Common/Helpers/emailUtils")
import { validationUtils } from '../../../Common/Helpers/validationUtils';

export async function ForgotPasswordHandler(email: string): Promise<ForgotPasswordResponse> {
    try {
        const userRepository: IUserRepository = new UserRepository();
        const queryData: any = {
            isDelete: false,
            isActive: true,
            emailConfirmed: true,
        }

        const emailError = validationUtils.validateEmail(email);
        if (emailError){
             return new ForgotPasswordResponse("Validation failed", 400, {}, emailError);
        }
        
        const user: any = await userRepository.getUserByEmail(email, queryData);
        if (!user) {
            throw new Error("User with email" + email + "doesn't exist!");
        }

        user.emailCode = await md5Encrypt(user.emailCode);
        user.password = moment().valueOf();
        const emailData: any = {
            fullname: user.fullname,
            email: user.email,
            emailCode: user.emailCode,
            password: user.password,
        }
        const sendMailResponse: string = await sendMail(user.email, "Welcome to NoahQuiz", emailData, "forgotPasswordEmailTemplate.ejs");

        return new ForgotPasswordResponse("Sent Mail Successfully", 201, sendMailResponse)
    } catch (error: any) {
        throw new Error("Error at ForgotPasswordHandler:" + error.message);
    }
}