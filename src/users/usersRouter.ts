import { Router } from "express";
import { UsersController } from "./usersController";
import UserOperations from "./usersOperations";
import msDatabase from "../common/database/data-mssql";
import AuthService from "../common/authService";

class UsersRouter{
    router:Router;
    private auth: AuthService;

    constructor( private readonly controller: UsersController ){
        this.router = Router();
        this.auth = new AuthService();
        this.mountRoutes();
        
    }

   private mountRoutes(){
       this.router.post('/v1/create', [this.auth.verificaToken.bind(this.auth)], this.controller.createUser.bind(this.controller));
       this.router.put('/v1/update', [this.auth.verificaToken.bind(this.auth)], this.controller.updateUser.bind(this.controller));
       this.router.put('/v1/status', [this.auth.verificaToken.bind(this.auth)], this.controller.statusUser.bind(this.controller));
       this.router.put('/v1/pass', [this.auth.verificaToken.bind(this.auth)], this.controller.passUser.bind(this.controller));
       this.router.put('/v1/get', [this.auth.verificaToken.bind(this.auth)], this.controller.getUsersPag.bind(this.controller));
       this.router.post('/v1/login', this.controller.login.bind(this.controller));
    }
}

const db = msDatabase;
const operations = new UserOperations(db);
const controller = new UsersController(operations);
const routes = new UsersRouter(controller).router;
export { routes };