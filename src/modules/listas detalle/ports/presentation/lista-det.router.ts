import { Router } from "express";
import { ListaDetalleController } from "./lista-det.controller";
import { ListaDetalleAplication } from "../../application/lista-det.application";
import { ListaDetalleAdapter } from "../../adapters/lista-det.adapter";
import { ListaDetallePort } from "../lista-det.port";
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';





export class ListaDetalleRouters { 

    readonly router = Router();
    
        constructor(private readonly controller: ListaDetalleController) { 
            this.mountRoutes();
    }
    
       mountRoutes() {

        this.router.post('/', AuthenticationGuard.execute, this.controller.create.bind(this.controller));
        this.router.put('/', AuthenticationGuard.execute, this.controller.update.bind(this.controller));
        this.router.delete('/:id/:status/:user_exe', AuthenticationGuard.execute, this.controller.inactivate.bind(this.controller));
        this.router.put('/get', AuthenticationGuard.execute, this.controller.getByPage.bind(this.controller));
        
    }

};

const port: ListaDetallePort = new ListaDetalleAdapter();
const application = new ListaDetalleAplication(port);
const controller = new ListaDetalleController(application);
export const listaDetalleRouter = new ListaDetalleRouters(controller).router;