import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import { routes as UsersRouter } from "./users/usersRouter";
import { routes as RolesRouter } from "./roles/rolesRouter";
import { routes as FiltersRouter } from "./filters/filtersRouter";
import e from "./common/config/enviroment-vars";

class App{
    private app: Application;

    constructor(private readonly appName:string){
        this.app = express();
        this.middlewares();
        this.mountRoutes();
    }

    private middlewares() {
        this.app.use(cors()); //control de acceso paginas
        this.app.use(express.json({ limit: '10mb' })); // parse y lectura de body
        this.app.use(express.static(path.join(__dirname, '../../public'))); // configuracion contenido html carpeta publica
        this.app.use(express.urlencoded({ extended: true }));
     };

    private mountRoutes() {
        this.app.use('/users', UsersRouter);
        this.app.use('/rol', RolesRouter);
        this.app.use('/filters',FiltersRouter);
    };

    getApp(){
        return this.app;
    };

};
const application = new App(e.envs.APP).getApp();
export { application }