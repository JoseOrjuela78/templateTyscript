
import { Response } from 'express';
import Logger from '../common/logger';
import ResponseManagenent from '../common/responseManagement';
import { UtilService } from '../common/utilsService';
import AppError from '../common/appError';
import UserOperations from './usersOperations';
import { IUserDom } from './port/models/IUserDom';
import { IUsersSearchFilters } from './port/models/IUsersSearchFilters';
import { ILogin } from './port/models/ILogin';
import { UserValidator } from './port/validators/userValidator';
import { UserUpValidator } from './port/validators/userUpValidator';
import { UserStsValidator } from './port/validators/userStsValidator';
import { UserPassValidator } from './port/validators/userPassValidator';
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
            const exec_usuario = req.user.ID_USUARIO;
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
                userValidator.exec_usuario = exec_usuario;
            
            const errors = await UtilService.validateErrors(userValidator);

           if(errors.length > 0){
               throw new AppError(JSON.stringify(errors), 411);
           };

            user.pass = await this.auth.encryptPassword(user.pass);
               
            const result = await this.operation.createUser(user);

            return this.resManagement.responseResult(
                req,
                res,
                result.status_code,
                result.status_desc,
                result.code
            );

        } catch (error:any) {

            return this.resManagement.responseError(
                req,
                res,
                error.code,
                error.message
            );

        };
   };

   async updateUser(req:any, res:Response){
        try {
            this.log.info(`${req.method}-${req.originalUrl} entry to updateUser with body ${JSON.stringify(req.body)}`);
            const exec_usuario = req.user.ID_USUARIO;

            const user: IUserDom = req.body;
            const userUpValidator = new UserUpValidator();
                userUpValidator.tipo_persona = user.tipo_persona ;
                userUpValidator.tipo_identificacion = user.tipo_identificacion;
                userUpValidator.identificacion =  user.identificacion;
                userUpValidator.razon_social = user.razon_social;
                userUpValidator.nombre1 = user.nombre1;
                userUpValidator.nombre2 = user.nombre2;
                userUpValidator.apellido1 = user.apellido1;
                userUpValidator.apellido2 = user.apellido2;
                userUpValidator.email = user.email;
                userUpValidator.genero = user.genero;
                userUpValidator.ciudad = user.ciudad;	
                userUpValidator.telefono = user.telefono;
                userUpValidator.id_rol = user.id_rol;
                userUpValidator.exec_usuario = exec_usuario;
            
            const errors = await UtilService.validateErrors(userUpValidator);

           if(errors.length > 0){
               throw new AppError(JSON.stringify(errors), 411);
           };

            const result = await this.operation.updateUser(user);

            return this.resManagement.responseResult(
                req,
                res,
                result.status_code,
                result.status_desc,
                []
            );

        } catch (error:any) {

            return this.resManagement.responseError(
                req,
                res,
                error.code,
                error.message
            );

        };
   };

   async statusUser(req:any, res:Response){
        try {
            this.log.info(`${req.method}-${req.originalUrl} entry to statusUser with body ${JSON.stringify(req.body)}`);
            const exec_usuario = req.user.ID_USUARIO;
            const body = req.body;
            const userStsValidator = new UserStsValidator();
                userStsValidator.identificacion =  body.identificacion;
                userStsValidator.estado = body.estado;
                userStsValidator.exec_usuario = exec_usuario;
            
            const errors = await UtilService.validateErrors(userStsValidator);

           if(errors.length > 0){
               throw new AppError(JSON.stringify(errors), 411);
           };

            const result = await this.operation.updateStatusUser(body.identificacion,body.estado,exec_usuario);

            return this.resManagement.responseResult(
                req,
                res,
                result.status_code,
                result.status_desc,
                []
            );

        } catch (error:any) {

            return this.resManagement.responseError(
                req,
                res,
                error.code,
                error.message
            );

        };
   };

   async passUser(req:any, res:Response){
        try {
            this.log.info(`${req.method}-${req.originalUrl} entry to passUser with body ${JSON.stringify(req.body)}`);
            const exec_usuario = req.user.ID_USUARIO;
            const body = req.body;
            const userPassValidator = new UserPassValidator();
                userPassValidator.id_usuario =  body.id_usuario;
                userPassValidator.pass = body.pass;
                userPassValidator.exec_usuario = exec_usuario;
            
            const errors = await UtilService.validateErrors(userPassValidator);

           if(errors.length > 0){
               throw new AppError(JSON.stringify(errors), 411);
           };

            body.pass = await this.auth.encryptPassword(body.pass);
            const result = await this.operation.updatePassUser(body.id_usuario,body.pass,exec_usuario);

            return this.resManagement.responseResult(
                req,
                res,
                result.status_code,
                result.status_desc,
                []
            );

        } catch (error:any) {

            return this.resManagement.responseError(
                req,
                res,
                error.code,
                error.message
            );

        };
   };

   async getUsersPag(req:any, res:Response){
    try {
        this.log.info(`${req.method}-${req.originalUrl} entry to getUsersPag with body ${JSON.stringify(req.body)}`);
        const body = req.body;
        const base: IUsersSearchFilters ={
            ordercolumn: "ID_USUARIO",
            orderdirection: "ASC",
            pagenumber: null,
            pagesize: null,
            identificacion: null,
            id_usuario: null,
            tipo_persona: null,
            tipo_identificacion: null,
            razon_social: null,
            nombre: null,
            email: null,
            genero: null,
            ciudad: null,
            telefono: null,
            id_rol: null,
            estado: null,
            fechainicio: null,
            fechafinal: null
        };
        const filters = await UtilService.mapWithDefaults(base,body);

        const result = await this.operation.getUsersPag(filters);

        if (result.status_code != 200) throw new AppError(result.status_desc, result.status_code);

        return this.resManagement.responseResult(
                req,
                res,
                result.status_code,
                result.status_desc,
                result
        );
        
    } catch (error:any) {

        return this.resManagement.responseError(
                req,
                res,
                error.code,
                error.message
            );
        
    };
   }

   async login(req:any, res:Response){
    try {
            this.log.info(`${req.method}-${req.originalUrl} entry to login`);
           
            const login: ILogin = req.body;
            const loginValidator = new LoginValidator();
                  loginValidator.email = login.email;
                  loginValidator.pass = login.pass;
                
            const errors = await UtilService.validateErrors(loginValidator);

           if(errors.length > 0){
               throw new AppError(JSON.stringify(errors), 411);
           };

            const result = await this.operation.login(login);

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
               
            return this.resManagement.responseResult(
                req,
                res,
                result.status_code,
                result.status_desc,
                {token}
            );
        
        } catch (error:any) {
        
            return this.resManagement.responseError(
                req,
                res,
                error.code,
                error.message
            );
        
        };
    };
};