import { Router } from "express";
import { RolesController } from "./roles.controller";
import { RolesAplication } from "../../application/roles.application";
import { RolesPort } from "../roles.port";
import { RolesAdapter } from "../../adapters/roles.adapter";
import { AuthenticationGuard } from "../../../../core/guard/authentication.guard";


export class RolesRouters { 
    readonly router = Router();
    
           constructor(private readonly controller: RolesController) { 
                this.mountRoutes();
    }
    
        mountRoutes() {

        this.router.post('/', AuthenticationGuard.execute, this.controller.create.bind(this.controller));
        this.router.put('/', AuthenticationGuard.execute, this.controller.update.bind(this.controller));
        this.router.delete('/:id/:status/:user_exe', AuthenticationGuard.execute, this.controller.inactivate.bind(this.controller));
        this.router.put('/get', AuthenticationGuard.execute, this.controller.getByPage.bind(this.controller));
        
    }

};


const port: RolesPort = new RolesAdapter();
const application = new RolesAplication(port);
const controller = new RolesController(application);
export const rolesRouter = new RolesRouters(controller).router;