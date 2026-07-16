import { Router } from "express";
import AuthService from "../common/authService";
import { FiltersController } from "./filtersControllers";
import msDatabase from "../common/database/data-mssql";
import FiltersOperations from "./filtersOperations";

class FiltersRouter{
    
    router:Router;
    private auth: AuthService;

    constructor(private readonly controller: FiltersController){
        this.router = Router();
        this.auth = new AuthService();
        this.mountRoutes();
    }

   private mountRoutes(){
        this.router.get('/v1/:idLista',[this.auth.verificaToken.bind(this.auth)],this.controller.getlist.bind(this.controller));
        this.router.get('/v1/cities/:codPais',[this.auth.verificaToken.bind(this.auth)],this.controller.getCities.bind(this.controller));
   }
}

const db = msDatabase;
const operations = new FiltersOperations(db);
const controller = new FiltersController(operations);
const routes = new FiltersRouter(controller).router;
export { routes };