import { Router } from "express";

class RestrictionsRouter{
    router:Router;

    constructor(){
        this.router = Router();
        this.mountRoutes();
    }

   private mountRoutes(){
        this.router.get('/',(req,res)=>{
            res.send('Welcome to Restrictions')
        })
    }
}
const routes = new RestrictionsRouter().router;
export { routes };