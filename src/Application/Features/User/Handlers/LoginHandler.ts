import { response } from "express";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { LoginResponse } from "../Response/LoginResponse";
import { LoginRequest } from "../Requests/LoginRequest";
import { UserWithBase } from "../../../../Domain/Entities/UserEntites";
import { comparePassword } from "../../../Common/Helpers/passwordUtils";
import { addDuration, encodejwt } from "../../../Common/Helpers/jwtUtils";
import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { CreateSessionHandler } from "../../Session/Handlers/CreateSessionHandler";

async function LoginHandler(data: any): Promise<LoginResponse> {
    try {
        const userRepository = new UserRepository();
        const sessionRepository = new SessionRepository();
        const { deviceId, ipAddress, email, password } = data;

        const queryData: any = {
            isDelete: false,
            isActive: true,
            emailConfirmed: true,
        }
        const user: any = await userRepository.getUserByEmail(email, queryData);

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error("Password is not match!");
        }

        const token = await encodejwt(user);

        const queryDataSession: any = {
            email: email.toLowerCase(),
            ipAddress: ipAddress,
            deviceId: deviceId,
            isDelete: true
        }

        const session: any = await sessionRepository.findSessionByEmailAndIP(queryDataSession);
        if (session != null) {
                await sessionRepository.deleteSession(session._id); 
        } 

        const tokenExpiryDate = addDuration(token.expiresIn || "");
        const refreshTokenExpiryDate = addDuration(process.env.REACT_APP_EXPIRE_REFRESH_TOKEN || "");

        const dataForCreateSession: any = {
            user: user,
            token: token,
            deviceId: deviceId,
            ipAddress: ipAddress,
            refreshTokenExpiryDate: refreshTokenExpiryDate,
            tokenExpiryDate: tokenExpiryDate,
        }

        await CreateSessionHandler(dataForCreateSession);

        const dataTokenResponse = {
            accessToken: token.token,
            refreshToken: token.refreshToken,
            expireIn: token.expiresIn || ""
        }

        const loginResponse = new LoginResponse("Success", 200, dataTokenResponse);

        return loginResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default LoginHandler;