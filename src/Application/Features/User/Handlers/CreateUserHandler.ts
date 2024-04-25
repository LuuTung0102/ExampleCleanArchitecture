import { CreateUserResponse } from './../Response/CreateUserResponse';
import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from '../../../Persistences/IRepositories/IUserRepository';
import IRoleRepository from '../../../Persistences/IRepositories/IRoleRepository';

import {sendMail} from '../../../../Application/Common/Helpers/emailUtils';
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import { validationUtils } from '../../../Common/Helpers/validationUtils';


export async function CreateUserHandler(data: any): Promise<CreateUserResponse> {
  try {
    const userRepository: IUserRepository = new UserRepository();
    const roleRepository: IRoleRepository = new RoleRepository();
    const {email, fullname, password, phoneNumber, username} = data;
    const roleQueryData: any = {
        isDelete: false,
        isActive: true,
    }

    // Validate fields
    const emailError = validationUtils.validateEmail(email);
    const fullnameError = validationUtils.validateName(fullname);
    const passwordError = validationUtils.validatePassword(password);
    const phoneNumberError = validationUtils.validatePhoneNumber(phoneNumber);
    const usernameError = validationUtils.validateUsername(username);

    if (emailError || fullnameError || passwordError || phoneNumberError || usernameError) {
      // Construct error message with appropriate separators
      let errorMessage = '';
      if (emailError) errorMessage += emailError + '; ';
      if (fullnameError) errorMessage += fullnameError + '; ';
      if (passwordError) errorMessage += passwordError + '; ';
      if (phoneNumberError) errorMessage += phoneNumberError + '; ';
      if (usernameError) errorMessage += usernameError + '; ';
      
      // Remove trailing ';' and return error response
      errorMessage = errorMessage.trim().replace(/;+$/, '');
      return new CreateUserResponse("Validation failed", 400, {}, errorMessage);
    }


        
    const role: any = await roleRepository.getRoleByName("User", roleQueryData);
    const createUserRoleData: any = {
      email: email,
      fullname: fullname,
      password: password,
      phoneNumber: phoneNumber,
      username: username,
      role_id: role._id
    };
    const result: any = await userRepository.createUser(createUserRoleData);

    const emailHash = await md5Encrypt(result.emailCode);
    const emailData = { 
      email: email,
      fullname: fullname,
      emailCode: emailHash,
    }

    await sendMail(email, "Welcome to Noah-Quiz!", emailData, "verifyEmailTemplate.ejs");


    return new CreateUserResponse("Successful", 200, result);

  } catch (error: any) {
    throw new Error("Error at CreateUserHandler: " + error.message);
  }
}
