import { NextFunction, Request, Response } from "express";
import { TokenService } from "../utils/token.service";
import { JwtPayload } from "jsonwebtoken";

export class AuthenticationGuard {

    static execute(request: Request, response: Response, next: NextFunction):any {
        const authHeader = request.headers['authorization'] ?? "";
        const validateAccessToken = TokenService.verifyAccessToken(authHeader.split(' ')[1])

        if (!authHeader?.startsWith('Bearer ')) {
            response.status(401).json({ message: 'Unauthenticated' });
        } else if (!authHeader.split(' ')[1]) {
            response.status(401).json({ message: 'Unauthorized' })
        } else if (!validateAccessToken.valid) {
                if (validateAccessToken.expired) {
                    return response.status(403).json({ message: 'Forbidden - Token expired' });
                } else {
                    return response.status(401).json({ message: 'Unauthorized - Invalid Token' });
                }
        } else {
            response.locals.user_id = (validateAccessToken.decoded as JwtPayload).user_id;
            next();
        }

    }
}