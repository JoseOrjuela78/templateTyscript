import { Router } from 'express';
import { AuthController } from "./auth.controller";
import { UserAdapter } from '../../user/adapters/user.adapter';
import { UserPort } from '../../user/ports/user.port';
import { AuthAplication } from '../application/auth.application';


export class AuthRouters{
    readonly router = Router();

    constructor(private readonly controller: AuthController) { 
        this.mountRoutes();
    }
    
    mountRoutes() {

        this.router.post('/',this.controller.login.bind(this.controller));
     
    }
};

const port: UserPort = new UserAdapter();
const application = new AuthAplication(port);
const controller = new AuthController(application);
export const authRouter = new AuthRouters(controller).router;