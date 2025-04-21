import { Request, Response } from "express";
import { ResultI } from "../../../../core/adapter/operarations.model";
import { ValidatorBody, ValidatorParameters } from "../../../../core/utils/decorator.service";
import { ListaDetalleAplication } from "../../application/lista-det.application";
import { InactivateParamsValidator, ListaDetalleUpdateValidator, ListaDetalleValidator } from "./lista-det-validator/lista-det-validator.dto";
import { ListaDetalleD } from "../../models/model.lista-det.domain";

export class ListaDetalleController {

           constructor(
                private readonly application: ListaDetalleAplication
    ) { }
    
   @ValidatorBody(ListaDetalleValidator)
   async create(request: Request, response: Response) {
        
            const { id_list, value, params, user_exec} = request.body;
                 
                const ListaDetalleDomanin: ListaDetalleD = {
                                                            id_list,
                                                            value,
                                                            params,
                                                            user_exec
                                                           };
                      
               const result: ResultI = await this.application.create(ListaDetalleDomanin);
               response.status(result.STATUS_CODE).json(result);
               
    }
    
     @ValidatorBody(ListaDetalleUpdateValidator)
            async update(request: Request, response: Response) {
        
            const { id_list_det,id_list, value, params, user_exec} = request.body;
                 
                const ListaDetalleDomanin: ListaDetalleD = {
                                                            id_list_det,
                                                            id_list,
                                                            value,
                                                            params,
                                                            user_exec
                                                            };
                      
               const result: ResultI = await this.application.update(ListaDetalleDomanin);
               response.status(result.STATUS_CODE).json(result);
               
    }
    
    @ValidatorParameters(InactivateParamsValidator)
    async inactivate(request: Request, response: Response) {
            
           const { id, status, user_exe } = request.params;
                
           const result: ResultI = await this.application.inactivate(Number(id), Number(status), Number(user_exe));
                 
          response.status(result.STATUS_CODE).json(result);
               
              
    }

    async getByPage(request: Request, response: Response) {
    
        const { page, pageSize, id_lista, status, filtros} = request.body;
      
        const result: any = await this.application.getByPage(page, pageSize, id_lista, status, filtros);
         
        response.status(result.STATUS_CODE).json(result);
      
           
    }
    

 }