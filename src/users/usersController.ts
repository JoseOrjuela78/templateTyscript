
import { Request, Response } from 'express';
import UserOperations from './usersOperations';
import { IUserDom } from './port/models/IUserDom';
import ResponseManagenent from '../common/responseManagement';
import Logger from '../common/logger';
import { UserValidator } from './port/validators/userValidator';
import { validate } from 'class-validator';
import { UtilService } from '../common/utilsService';
import AppError from '../common/appError';
import { ILogin } from './port/models/ILogin';
import { LoginValidator } from './port/validators/loginValidator';
import { uuid } from 'uuidv4';
import AuthService from '../common/authService';


export class UsersController {

    private resManagement:ResponseManagenent;
    private log:Logger;
    private auth: AuthService;
    
    constructor(
        private readonly operation: UserOperations
    ){
        this.resManagement = new ResponseManagenent();
        this.log = new Logger();
        this.auth = new AuthService();
       
    }

   async createUser(req:any, res:Response){
        try {
            this.log.info(`${req.method}-${req.originalUrl} entry to createUser with body ${JSON.stringify(req.body)}`);
            const id_user = req.user.ID_USUARIO;
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
                userValidator.id_usuario = id_user;
            
            const errors = await validate(userValidator);

           if(errors.length > 0){
            const errorsMessages = UtilService.extractErrorMessages(errors);
            throw new AppError(JSON.stringify(errorsMessages), 411);
            };

            user.pass = await this.auth.encryptPassword(user.pass);
               
            const result = await this.operation.createUser(user);
            return this.resManagement.responseResult(req,res,result.status_code,result.status_desc,result.data);
        } catch (error:any) {
            return this.resManagement.responseError(req,res,error.code,error.message);
        };
   };

   async login(req:Request, res:Response){
    try {
            this.log.info(`${req.method}-${req.originalUrl} entry to login`);
           
            const login: ILogin = req.body;
            const loginValidator = new LoginValidator();
                  loginValidator.email = login.email;
                  loginValidator.pass = login.pass;
                
            const errors = await validate(loginValidator);

           if(errors.length > 0){
            const errorsMessages = UtilService.extractErrorMessages(errors);
            throw new AppError(JSON.stringify(errorsMessages), 411);
            };

            const result = await this.operation.login(login.email);

            if(result.status_code != 200){
                throw new AppError(result.status_desc, result.status_code);
            };

            const user = result.user;
            const dbPass = result.pass ?? uuid();
            let status = await this.auth.comparePassword(login.pass, dbPass);
            
            if(!status){
                throw new AppError('Incorrect credentials', 403);
            };
         
        const token = await this.auth.sign({ user });
                
            return this.resManagement.responseResult(req,res,result.status_code,result.status_desc,{token});
        } catch (error:any) {
            return this.resManagement.responseError(req,res,error.code,error.message);
        };
    };
};