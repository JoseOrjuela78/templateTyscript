import { Router } from "express";
import { UsersController } from "./usersController";
import UserOperations from "./usersOperations";
import database from "../common/database/data-source";

class UsersRouter{
    router:Router;

    constructor( private readonly controller: UsersController ){
        this.router = Router();
        this.mountRoutes();
    }

   private mountRoutes(){
        this.router.get('/',(req,res)=>{
            res.send('Welcome to Users')
        })

        this.router.post('/create',this.controller.createUser.bind(this.controller));
    }
}

const db = database;
const operations = new UserOperations(db);
const controller = new UsersController(operations);
const routes = new UsersRouter(controller).router;
export { routes };