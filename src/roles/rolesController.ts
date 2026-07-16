import { Response } from 'express';
import Logger from "../common/logger";
import ResponseManagenent from "../common/responseManagement";
import RolesOperations from './rolesOperations';
import { PermitsValidator } from './port/validators/permitsValidator';
import { IPermits } from './port/models/IPermits';
import { UtilService } from '../common/utilsService';
import AppError from '../common/appError';

export class RolesController {

    private resManagement:ResponseManagenent;
    private log:Logger;

    constructor(
        private readonly operation: RolesOperations
    ){
        this.resManagement = new ResponseManagenent();
        this.log = new Logger();
       
    }

    //ROLES

    async createPermisosRol(req:any, res:Response){
        try {
            this.log.info(`${req.method}-${req.originalUrl} entry to createPermisosRol with body ${JSON.stringify(req.body)}`);
            const permits: IPermits = req.body;
            permits.exec_usuario = req.user.ID_USUARIO;

            const permitsValidator = new PermitsValidator();
            permitsValidator.permisos = permits.permisos;
            permitsValidator.exec_usuario = permits.exec_usuario;

            const errors = await UtilService.validateErrors(permitsValidator);

           if(errors.length > 0){
               throw new AppError(JSON.stringify(errors), 411);
           };

           const permitsJson = JSON.parse(permits.permisos);

           if (permitsJson.length <= 0) throw new AppError('permits empty', 404);

           permits.permisos = await UtilService.createPermitsSchema(permitsJson);

           const result = await this.operation.createPermisosRol(permits);

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
    };

    //RESTRICCIONES

    //MENUS

}