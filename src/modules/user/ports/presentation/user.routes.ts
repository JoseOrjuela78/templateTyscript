import { Router } from 'express';
import { UserController } from "./user.controller";
import { UserAplication } from '../../application/user.application';
import { UserPort } from '../user.port';
import { UserAdapter } from '../../adapters/user.adapter';

export class UserRouters{
    readonly router = Router();

    constructor(private readonly controller: UserController) { 
        this.mountRoutes();
    }
    
    mountRoutes() {

        this.router.post('/:id', this.controller.create.bind(this.controller));
        
    }
};

const port: UserPort = new UserAdapter();
const application = new UserAplication(port);
const controller = new UserController(application);
export const userRouter = new UserRouters(controller).router;