import { Request, Response } from "express";
import { MenuAplication } from "../../application/menu.application";
import { MenuD } from "../../models/model.menu.domain";
import { ValidatorBody, ValidatorParameters, } from "../../../../core/utils/decorator.service";
import { MenuValidator, MenuUpdateValidator, InactivateParamsValidator} from "./menu-validator/menu-validator.dto";
import { ResultI } from "../../../../core/adapter/operarations.model";


export class MenuController {
    constructor(
        private readonly application: MenuAplication
    ) { }
  
    @ValidatorBody(MenuValidator)
    async create(request: Request, response: Response) {

    const { menu_title, type, icon, path, depend, JsonInput, user_exec} = request.body;
         
        const MenuDomanin: MenuD = {
                                    menu_title, 
                                    type, 
                                    icon, 
                                    path, 
                                    depend,
                                    JsonInput,
                                    user_exec
                                   };
              
       const result: ResultI = await this.application.create(MenuDomanin);
       response.status(result.STATUS_CODE).json(result);
       
    }

    @ValidatorBody(MenuUpdateValidator)
    async update(request: Request, response: Response) {

    const { id_menu, menu_title, type, icon, path, depend, user_exec} = request.body;
         
        const UserDomanin: MenuD = {
                                    id_menu,
                                    menu_title, 
                                    type, 
                                    icon, 
                                    path, 
                                    depend,
                                    user_exec
                                   };
              
       const result: ResultI = await this.application.update(UserDomanin);
       response.status(result.STATUS_CODE).json(result);
       
    }

    @ValidatorParameters(InactivateParamsValidator)
    async inactivate(request: Request, response: Response) {
    
        const { id, status, user_exe } = request.params;
        
        const result: ResultI = await this.application.inactivate(Number(id), Number(status), Number(user_exe));
         
        response.status(result.STATUS_CODE).json(result);
       
           
    }

    async getByPage(request: Request, response: Response) {
    
        const { page, pageSize, id_menu, status, filtros} = request.body;
        
        const result: any = await this.application.getByPage(page, pageSize, id_menu, status,filtros);
         
        response.status(result.STATUS_CODE).json(result);
       
           
    }

    async getActivateMenus(request: Request, response: Response) {
    
        const result: any = await this.application.getActivateMenus();
         
        response.status(result.STATUS_CODE).json(result);
              
    }
    



}