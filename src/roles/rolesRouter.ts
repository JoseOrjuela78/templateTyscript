import { Router } from "express";
import AuthService from "../common/authService";

class RolesRouter{
    router:Router;
    private auth: AuthService;

    constructor(){
        this.router = Router();
        this.auth = new AuthService();
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