import { Request, Response } from "express";
import { RolesAplication } from "../../application/roles.application";
import { ResultI } from "../../../../core/adapter/operarations.model";
import { RolesD } from "../../models/model.roles.domain";
import { ValidatorBody, ValidatorParameters } from "../../../../core/utils/decorator.service";
import { InactivateParamsValidator, RolesUpdateValidator, RolesValidator } from "./roles-validator/roles-validator.dto";


export class RolesController { 

              constructor(
                    private readonly application: RolesAplication
    ) { }
    
     @ValidatorBody(RolesValidator)
       async create(request: Request, response: Response) {
            
                const { rol_name, user_exec} = request.body;
                     
                    const RolDomanin: RolesD = {
                                                rol_name,
                                                user_exec
                                              };
                          
                   const result: ResultI = await this.application.create(RolDomanin);
                   response.status(result.STATUS_CODE).json(result);
                   
    }
    
   @ValidatorBody(RolesUpdateValidator)
      async update(request: Request, response: Response) {
            
      const { id_role, rol_name, user_exec} = request.body;
                     
               const RolDomanin: RolesD = {
                                           id_role,
                                           rol_name,
                                           user_exec
                                         };
                          
               const result: ResultI = await this.application.update(RolDomanin);
               response.status(result.STATUS_CODE).json(result);
                   
    }
    
        
    @ValidatorParameters(InactivateParamsValidator)
       async inactivate(request: Request, response: Response) {
                
            const { id, status, user_exe } = request.params;
                    
            const result: ResultI = await this.application.inactivate(Number(id), Number(status), Number(user_exe));
                     
            response.status(result.STATUS_CODE).json(result);
                   
                  
    }
    
   async getByPage(request: Request, response: Response) {
    
        const { page, pageSize, id_role, status, filtros} = request.body;
      
        const result: any = await this.application.getByPage(page, pageSize, id_role, status, filtros);
         
        response.status(result.STATUS_CODE).json(result);
           
   }

}