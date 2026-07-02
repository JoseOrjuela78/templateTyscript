import { Router } from "express";
import {responseResult, responseError}  from "../common/responseManagement";

class RolesRouter{
    router:Router;

    constructor(){
        this.router = Router();
        this.mountRoutes();
    }

   private mountRoutes(){
        this.router.get('/',(req,res)=>{

          responseResult(req, res,200,'Welcome to Roles',[]);
          //responseError(req, res,404,'Error to Roles');

                 
        })
    }
}
const routes = new RolesRouter().router;
export { routes };