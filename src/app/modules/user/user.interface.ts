/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export type TUserRole = keyof typeof USER_ROLE;

export type TUser = {
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    isVerified: boolean;
}

export interface UserModel extends Model<TUser> {
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}