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
       this.router.post('/create', [this.auth.verificaToken.bind(this.auth)], this.controller.createUser.bind(this.controller));
       this.router.post('/login', this.controller.login.bind(this.controller));
    }
}

const db = msDatabase;
const operations = new UserOperations(db);
const controller = new UsersController(operations);
const routes = new UsersRouter(controller).router;
export { routes };