import { Request, Response } from "express";
import { ResultI } from "../../../../core/adapter/operarations.model";
import { ValidatorBody, ValidatorParameters } from "../../../../core/utils/decorator.service";
import { UserAplication } from "../../application/user.application";
import { InactivateParamsValidator, UserUpdateValidator, UserValidator } from "./user-validator/user-validator.dto";
import { UserD } from "../../models/model.user.domain";
import { CypherService } from "../../../../core/utils/cypher.service";
import { TokenService } from "../../../../core/utils/token.service";


export class UserController {
    constructor(
        private readonly application: UserAplication
    ) { }

       @ValidatorBody(UserValidator)
       async create(request: Request, response: Response) {
            
                const { type_doc_id, id, name, e_activity, city_id, birth_date, email,pep, rol_id, password, user_exec } = request.body;
                const passCypher = await CypherService.hash(password, 10);
                const refreshToken = TokenService.generateRefreshToken();
                    const UsuarioDomain: UserD = {    
                                                  type_doc_id,
                                                  id,
                                                  name, 
                                                  e_activity,
                                                  city_id,
                                                  birth_date,
                                                  email,
                                                  pep,
                                                  rol_id,
                                                  password: passCypher,
                                                  user_exec,
                                                  refreshToken
                                                               };
                          
                   const result: ResultI = await this.application.create(UsuarioDomain);
                   response.status(result.STATUS_CODE).json(result);
                   
       };
    
       @ValidatorBody(UserUpdateValidator)
       async update(request: Request, response: Response) {
            
                   const { user_id, type_doc_id, id, name, e_activity, city_id, birth_date, email,pep, rol_id, password, user_exec } = request.body;
                   const passCypher = await CypherService.hash(password, 10);
                   const refreshToken = TokenService.generateRefreshToken();
                   const UsuarioDomain: UserD = {    
                                                  user_id,
                                                  type_doc_id,
                                                  id,
                                                  name, 
                                                  e_activity,
                                                  city_id,
                                                  birth_date,
                                                  email,
                                                  pep,
                                                  rol_id,
                                                  password:passCypher,
                                                  user_exec,
                                                  refreshToken
                                                               };
                   const result: ResultI = await this.application.update(UsuarioDomain);
                   response.status(result.STATUS_CODE).json(result);
                   
    };
    
    @ValidatorParameters(InactivateParamsValidator)
    async inactivate(request: Request, response: Response) {
            
           const { id, status, user_exe } = request.params;
                
           const result: ResultI = await this.application.inactivate(Number(id), Number(status), Number(user_exe));
                 
          response.status(result.STATUS_CODE).json(result);
               
              
    };

    async getByPage(request: Request, response: Response) {
    
        const { page, pageSize, id_usuario, status, filtros} = request.body;
      
        const result: any = await this.application.getByPage(page, pageSize, id_usuario, status, filtros);
         
        response.status(result.STATUS_CODE).json(result);
      
           
    };
    


}