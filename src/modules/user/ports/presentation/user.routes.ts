import { Router } from 'express';
import { UserController } from "./user.controller";
import { UserAplication } from '../../application/user.application';
import { UserPort } from '../user.port';
import { UserAdapter } from '../../adapters/user.adapter';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';
import { AuthorizationGuard } from '../../../../core/guard/authorization.guard';




export class UserRouters{
    readonly router = Router();

    constructor(private readonly controller: UserController) { 
        this.mountRoutes();
    }
    
    mountRoutes() {

        this.router.post('/', AuthenticationGuard.execute ,this.controller.create.bind(this.controller));
        this.router.put('/', AuthenticationGuard.execute, this.controller.update.bind(this.controller));    
        this.router.delete('/:id/:status/:user_exe', AuthenticationGuard.execute, this.controller.inactivate.bind(this.controller));
        this.router.put('/get', AuthenticationGuard.execute, AuthorizationGuard.execute, this.controller.getByPage.bind(this.controller));
    }
};

const port: UserPort = new UserAdapter();
const application = new UserAplication(port);
const controller = new UserController(application);
export const userRouter = new UserRouters(controller).router;