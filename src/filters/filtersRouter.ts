import { Router } from "express";

class FiltersRouter{
    router:Router;

    constructor(){
        this.router = Router();
        this.mountRoutes();
    }

   private mountRoutes(){
        this.router.get('/',(req,res)=>{
            res.send('Welcome to filters')
        })
    }
}
const routes = new FiltersRouter().router;
export { routes };