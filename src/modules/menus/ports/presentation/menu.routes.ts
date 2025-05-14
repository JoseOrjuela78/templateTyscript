import { Router } from 'express';
import { MenuController } from './menu.controller';
import { MenuAplication } from '../../application/menu.application';
import { MenuPort } from '../menu.port';
import { MenuAdapter } from '../../adapters/menus.adapter';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';


export class MenuRouters{
    readonly router = Router();

    constructor(private readonly controller: MenuController) { 
        this.mountRoutes();
    }
    
    mountRoutes() {

        this.router.post('/', AuthenticationGuard.execute, this.controller.create.bind(this.controller));
        this.router.put('/', AuthenticationGuard.execute, this.controller.update.bind(this.controller));
        this.router.delete('/:id/:status/:user_exe', AuthenticationGuard.execute, this.controller.inactivate.bind(this.controller));
        this.router.put('/get', AuthenticationGuard.execute, this.controller.getByPage.bind(this.controller));
        this.router.get('/getActivate', AuthenticationGuard.execute, this.controller.getActivateMenus.bind(this.controller));
        
    }
};

const port: MenuPort = new MenuAdapter();
const application = new MenuAplication(port);
const controller = new MenuController(application);
export const menuRouter = new MenuRouters(controller).router;