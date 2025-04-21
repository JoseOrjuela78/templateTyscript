import { Request, Response } from "express";
import { ResultI } from "../../../../core/adapter/operarations.model";
import { ValidatorBody, ValidatorParameters } from "../../../../core/utils/decorator.service";
import { ListaAplication } from "../../application/lista.application";
import { ListaD } from "../../models/model.lista.domain";
import { InactivateParamsValidator, ListaUpdateValidator, ListaValidator } from "./lista-validator/lista-validator.dto";



export class ListaController { 

        constructor(
            private readonly application: ListaAplication
    ) { }
    
    @ValidatorBody(ListaValidator)
    async create(request: Request, response: Response) {
    
        const { nombre_lista, descripcion_lista, user_exec} = request.body;
             
            const ListaDomanin: ListaD = {
                                          nombre_lista,
                                          descripcion_lista,
                                          user_exec
                                         };
                  
           const result: ResultI = await this.application.create(ListaDomanin);
           response.status(result.STATUS_CODE).json(result);
           
    }
    
       @ValidatorBody(ListaUpdateValidator)
        async update(request: Request, response: Response) {
    
        const { id_lista, nombre_lista, descripcion_lista,user_exec} = request.body;
             
            const ListaDomanin: ListaD = {
                                          id_lista,
                                          nombre_lista,
                                          descripcion_lista,
                                          user_exec
                                        };
                  
           const result: ResultI = await this.application.update(ListaDomanin);
           response.status(result.STATUS_CODE).json(result);
           
    }
    
        @ValidatorParameters(InactivateParamsValidator)
        async inactivate(request: Request, response: Response) {
        
            const { id, status, user_exe } = request.params;
            
            const result: ResultI = await this.application.inactivate(Number(id), Number(status), Number(user_exe));
             
            response.status(result.STATUS_CODE).json(result);
           
               
    }
    
    async getByPage(request: Request, response: Response) {
    
        const { page, pageSize, id_lista, status} = request.body;
        
        const result: any = await this.application.getByPage(page, pageSize, id_lista, status);
         
        response.status(result.STATUS_CODE).json(result);
       
           
    }
    
    
 
}