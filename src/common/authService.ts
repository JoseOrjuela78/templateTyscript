import { Response, NextFunction } from 'express';
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import e from './config/enviroment-vars';
import ResponseManagenent from './responseManagement';

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

            const authHeader = req.headers['authorization'];
            // Verificamos que exista y tenga el formato correcto
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
               return this.resManagement.responseError(req,res,422,'Token not provided or invalid');
            };

            // Extraemos el token
            const token = authHeader.split(' ')[1];

            jwt.verify(token,this.jwtKey, async (err:any, decoded:any) => {
                 
                if (err) return this.resManagement.responseError(req,res,401,err);
                req.user = decoded;
                next();
            });
    }

}

export default AuthService