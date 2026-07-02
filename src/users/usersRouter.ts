import { Router } from "express";
import { UsersController } from "./usersController";
import operations from './usersOperations';

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

        this.router.post('/',this.controller.createUser.bind(this.controller));
    }
}

const controller = new UsersController(operations)
const routes = new UsersRouter(controller).router;
export { routes };