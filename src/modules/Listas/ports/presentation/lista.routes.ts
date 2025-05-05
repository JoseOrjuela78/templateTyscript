import { Router } from "express";
import { ListaController } from "./lista.controller";
import { ListaAplication } from "../../application/lista.application";
import { ListaPort } from '../lista.port';
import { ListaAdapter } from "../../adapters/lista.adapter";
import { AuthenticationGuard } from "../../../../core/guard/authentication.guard";



export class ListaRouters{
    readonly router = Router();

    constructor(private readonly controller: ListaController) { 
        this.mountRoutes();
    }
    
    mountRoutes() {

        this.router.post('/', AuthenticationGuard.execute, this.controller.create.bind(this.controller));
        this.router.put('/', AuthenticationGuard.execute, this.controller.update.bind(this.controller));
        this.router.delete('/:id/:status/:user_exe', AuthenticationGuard.execute, this.controller.inactivate.bind(this.controller));
        this.router.put('/get', AuthenticationGuard.execute, this.controller.getByPage.bind(this.controller));
        
    }
};

const port: ListaPort = new ListaAdapter();
const application = new ListaAplication(port);
const controller = new ListaController(application);
export const listaRouter = new ListaRouters(controller).router;