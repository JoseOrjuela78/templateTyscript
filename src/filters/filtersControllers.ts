import { Response } from 'express';
import AppError from "../common/appError";
import AuthService from "../common/authService";
import Logger from "../common/logger";
import ResponseManagenent from "../common/responseManagement";
import FiltersOperations from "./filtersOperations";


export class FiltersController {
    private resManagement:ResponseManagenent;
    private log:Logger;
    
    constructor(
        private readonly operation: FiltersOperations
    ){
        this.resManagement = new ResponseManagenent();
        this.log = new Logger();
    }

async getlist(req:any, res:Response){
        try {
            const idLista = req.params.idLista || 0;
            this.log.info(`${req.method}-${req.originalUrl} entry to getlist with code ${JSON.stringify(idLista)}`);
            
             const result = await this.operation.getListaDetalle(Number(idLista));

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

async getCities(req:any, res:Response){

    try {
        const codigo_pais = req.params.codPais;

        this.log.info(`${req.method}-${req.originalUrl} entry to getCiudades with code ${JSON.stringify(codigo_pais)}`);
           
        const result = await this.operation.getCitiesList(codigo_pais);

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

}