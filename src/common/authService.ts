import { Response, NextFunction } from 'express';
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import e from './config/enviroment-vars';
import ResponseManagenent from './responseManagement';
import AppError from './appError';

class AuthService{
    private resManagement:ResponseManagenent;
    private jwtKey:string;
    constructor(){
        this.resManagement = new ResponseManagenent();
        this.jwtKey = e.envs.JWT_KEY;
    }

   async comparePassword(bodyPass:string, dbPass:string) {
        const status = bcrypt.compareSync(bodyPass, dbPass)
        return status;
   };

   async encryptPassword(pass:string) {
        const salt = bcrypt.genSaltSync(10);
        const password = await bcrypt.hash(pass, salt);
        return password;
   };

   async sign(data:any){
        const token = jwt.sign(data,this.jwtKey,{ expiresIn: '8h' });
        return token;
   };

    verificaToken(req:any, res:Response, next:NextFunction){

        try {
            const authHeader = req.headers['authorization'];
            // Verificamos que exista y tenga el formato correcto
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new AppError('Token not provided or invalid', 422);
            };

            // Extraemos el token
            const token = authHeader.split(' ')[1];

            jwt.verify(token,this.jwtKey, async (err:any, decoded:any) => {
                 
                if (err) throw new AppError(err, 401);
                req.user = decoded;
                next();
            });
            
        } catch (error:any) {
            return this.resManagement.responseError(req,res,error.code,error.message);
        }
    }

}

export default AuthService