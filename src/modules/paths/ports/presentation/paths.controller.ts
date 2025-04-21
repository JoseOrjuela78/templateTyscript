import { Request, Response } from "express";
import { ResultI } from "../../../../core/adapter/operarations.model";
import { ValidatorBody, ValidatorParameters } from "../../../../core/utils/decorator.service";
import { PathsAplication } from "../../application/paths.application";
import { InactivateParamsValidator, PathUpdateValidator, PathValidator } from "./paths-validator/paths-validator";
import { PathsD } from "../../models/model.paths.domain";






export class PathsController { 

               constructor(
                    private readonly application: PathsAplication
    ) { }
    
       @ValidatorBody(PathValidator)
       async create(request: Request, response: Response) {
            
                const { id_menu, path, id_action, user_exec} = request.body;
                     
           const PathDomanin: PathsD = {
                                           id_menu, 
                                           path,
                                           id_action,
                                           user_exec
                                         };
                          
           const result: ResultI = await this.application.create(PathDomanin);
           response.status(result.STATUS_CODE).json(result);
                   
    }
    
    @ValidatorBody(PathUpdateValidator)
    async update(request: Request, response: Response) {
            
            const { id_path, id_menu, path, id_action, user_exec} = request.body;
                     
            const PathDomanin: PathsD = {
                                           id_path,
                                           id_menu, 
                                           path,
                                           id_action,
                                           user_exec
                                         };
                          
                   const result: ResultI = await this.application.update(PathDomanin);
                   response.status(result.STATUS_CODE).json(result);
                   
    }
    
    @ValidatorParameters(InactivateParamsValidator)
        async inactivate(request: Request, response: Response) {
                
               const { id, status, user_exe } = request.params;
                    
               const result: ResultI = await this.application.inactivate(Number(id), Number(status), Number(user_exe));
                     
              response.status(result.STATUS_CODE).json(result);
                   
                  
    }
    
     async getByPage(request: Request, response: Response) {
    
        const { page, pageSize, id_path, status, filtros} = request.body;
      
        const result: any = await this.application.getByPage(page, pageSize, id_path, status, filtros);
         
        response.status(result.STATUS_CODE).json(result);
              
    }


}