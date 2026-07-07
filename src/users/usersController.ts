
import { Request, Response } from 'express';
import UserOperations from './usersOperations';
import { IUserDom } from './port/models/IUserDom';
import ResponseManagenent from '../common/responseManagement';
import Logger from '../common/logger';
import { UserValidator } from './port/validators/userValidator';
import { validate } from 'class-validator';
import { UtilService } from '../common/utilsService';
import AppError from '../common/appError';
import bcrypt from 'bcryptjs';


export class UsersController {

    private resManagement:ResponseManagenent;
    private log:Logger;
    
    constructor(
        private readonly operation: UserOperations
    ){
        this.resManagement = new ResponseManagenent();
        this.log = new Logger();
       
    }

    
   private async encryptPassword(pass:string) {
        const salt = bcrypt.genSaltSync(10);
        const password = await bcrypt.hash(pass, salt);
        return password;
   };


    async createUser(req:Request, res:Response){
        try {
            this.log.info(`${req.method}-${req.originalUrl} entry to createUser with body ${JSON.stringify(req.body)}`);
            const user: IUserDom = req.body;
            const userValidator = new UserValidator();
                userValidator.tipo_persona = user.tipo_persona ;
                userValidator.tipo_identificacion = user.tipo_identificacion;
                userValidator.identificacion =  user.identificacion;
                userValidator.razon_social = user.razon_social;
                userValidator.nombre1 = user.nombre1;
                userValidator.nombre2 = user.nombre2;
                userValidator.apellido1 = user.apellido1;
                userValidator.apellido2 = user.apellido2;
                userValidator.email = user.email;
                userValidator.genero = user.genero;
                userValidator.ciudad = user.ciudad;	
                userValidator.telefono = user.telefono;
                userValidator.id_rol = user.id_rol;
                userValidator.pass = user.pass;
                userValidator.id_usuario = user.id_usuario;
            
            const errors = await validate(userValidator);

           if(errors.length > 0){
            const errorsMessages = UtilService.extractErrorMessages(errors);
            throw new AppError(JSON.stringify(errorsMessages), 411);
            };

            user.pass = await this.encryptPassword(user.pass);
               
            const result = await this.operation.createUser(user);
            return this.resManagement.responseResult(req,res,result.status_code,result.status_desc,result.data);
        } catch (error:any) {
            return this.resManagement.responseError(req,res,error.code,error.message);
        };
    };
};