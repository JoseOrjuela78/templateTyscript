import { Router } from "express";

class UsersRouter{
    router:Router;

    constructor(){
        this.router = Router();
        this.mountRoutes();
    }

   private mountRoutes(){
        this.router.get('/',(req,res)=>{
            res.send('Welcome to Users')
        })
    }
}
const routes = new UsersRouter().router;
export { routes };