import { Router } from "express";
import { PathsController } from "./paths.controller";
import { PathsAplication } from "../../application/paths.application";
import { PathsAdapter } from "../../adapters/paths.adapter";
import { PathsPort } from "../paths.port";
import { AuthenticationGuard } from "../../../../core/guard/authentication.guard";



export class PathsRouters { 
    readonly router = Router();
    
         constructor(private readonly controller: PathsController) { 
                this.mountRoutes();
    }
    
    mountRoutes() {

        this.router.post('/', AuthenticationGuard.execute, this.controller.create.bind(this.controller));
        this.router.put('/', AuthenticationGuard.execute, this.controller.update.bind(this.controller));
        this.router.delete('/:id/:status/:user_exe', AuthenticationGuard.execute, this.controller.inactivate.bind(this.controller));
        this.router.put('/get', AuthenticationGuard.execute, this.controller.getByPage.bind(this.controller));
        
    }
}

const port: PathsPort = new PathsAdapter();
const application = new PathsAplication(port);
const controller = new PathsController(application);
export const pathsRouter = new PathsRouters(controller).router;