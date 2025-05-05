import { v4 as uuidv4 } from "uuid";
import { envs } from '../../config/environment-vars';
import jwt, { JwtPayload } from 'jsonwebtoken';

export type ResultValidateAccessToken = {
    valid: boolean;
    expired: boolean;
    decoded?: JwtPayload | string;
};

export class TokenService{
    static generateRefreshToken() {
        return uuidv4();
    }

    static generateAccessToken(user_id: number, name: string) {
        const accesTokenSecret: string = envs.accesTokenSecret;
        const accesTokenExpiresIn: any = { expiresIn: envs.accesTokenExpiresIn };
        return jwt.sign({ user_id, name },accesTokenSecret, accesTokenExpiresIn);
        
    }

    static verifyAccessToken(token: string): ResultValidateAccessToken{
        try {
            const decoded = jwt.verify(token, envs.accesTokenSecret);
            return {valid:true, expired: false, decoded }
            
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return {valid: false, expired:true}
            } else {
                 return {valid: false, expired:false}
            }
            
        }
    }
}