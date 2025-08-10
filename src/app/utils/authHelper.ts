import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import { Types } from 'mongoose';

export const createToken = (
    jwtPayload: { userId: Types.ObjectId ; email: string; role: TUserRole },
    secret: string,
    expiresIn: number | string ,
) => {
    return jwt.sign(jwtPayload, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};