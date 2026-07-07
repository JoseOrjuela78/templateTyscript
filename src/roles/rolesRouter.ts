import { Router } from "express";

class RolesRouter{
    router:Router;

    constructor(){
        this.router = Router();
        this.mountRoutes();
    }

   private mountRoutes(){
        this.router.get('/',(req,res)=>{
             res.send('Welcome to Roles')        
        });
    }
}
const routes = new RolesRouter().router;
export { routes };