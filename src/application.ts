import express, { Application } from "express";
import path from "path";
import cors from "cors";
import { routes as UsersRouter } from "./users/usersRouter";
import { routes as RolesRouter } from "./roles/rolesRouter";
import { routes as RestrictionsRouter } from "./restrictions/restrictionsRouter";

class App{
    private app: Application;

    constructor(){
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
        this.app.use('/restrictions', RestrictionsRouter);
    };

    getApp(){
        return this.app;
    };

};
const application = new App().getApp();
export { application }