import { Response, NextFunction } from 'express';
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import e from './config/enviroment-vars';
import ResponseManagenent from './responseManagement';
import msDatabase from './database/data-mssql';
import sql from 'mssql';
import { UtilService } from './utilsService';

class AuthService{
    private resManagement:ResponseManagenent;
    private jwtKey:string;
    private db: typeof msDatabase

    constructor(){
        this.resManagement = new ResponseManagenent();
        this.jwtKey = e.envs.JWT_KEY;
        this.db = msDatabase;
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

   private async verificaPermits(req:any, res:Response){
     try {
        const result:any = this.db.executeStoredProcedure( 
            'PR_GET_PATH_PERMITIDO',
            {
                ID_ROL: { type: sql.Int, value: req.user.ID_ROL}
            },
            {
                STATUS_CODE: sql.Int,
                STATUS_DESC: sql.VarChar(500)
            }
        );
       

    const dbPaths = result.recordsets[0];
    return dbPaths;

    } catch (error:any) {
        return this.resManagement.responseError(req,res,error.code,error.message);
    };

   };

    verificaToken(req:any, res:Response, next:NextFunction){

            const authHeader = req.headers['authorization'];
            // Verificamos que exista y tenga el formato correcto
            if (!authHeader || !authHeader.startsWith('Bearer '))return this.resManagement.responseError(req,res,422,'Token not provided or invalid');
            // Extraemos el token
            const token = authHeader.split(' ')[1];

            jwt.verify(token,this.jwtKey, async (err:any, decoded:any) => {
                 
                if (err) return this.resManagement.responseError(req,res,401,err);
                req.user = decoded;

                const dbPaths = await this.verificaPermits(req,res);
                if(dbPaths.length <= 0)return this.resManagement.responseError(req,res,401,'Insufficient privileges');
                
                let sts = false;
                for (let per of dbPaths) {
                    if (req.method === per.method && UtilService.pathToRegex(per.path, req.originalUrl)) {
                     sts = true;
                     break;
                   };
                };

                if(!sts)return this.resManagement.responseError(req,res,401,'Insufficient privileges');
         
                next();
         
            });
    };

}

export default AuthService