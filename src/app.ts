import express from 'express';
import { userRouter } from './modules/user/ports/presentation/user.routes';
import { menuRouter } from './modules/menus/ports/presentation/menu.routes';
import { ResponseJson } from './core/interceptors/response-json.interceptor';
import { listaRouter } from './modules/Listas/ports/presentation/lista.routes';
import { listaDetalleRouter } from './modules/listas detalle/ports/presentation/lista-det.router';
import { rolesRouter } from './modules/roles/ports/presentation/roles.router';
import { pathsRouter } from './modules/paths/ports/presentation/paths.router';
import { authRouter } from './modules/auth/presentation/auth.routes';



class App {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.mountInterceptors();
    this.mountRoutes();
  }

   // Configura los middlewares de análisis de cuerpos
  private configureMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mountInterceptors() {
    this.app.use(ResponseJson);
  }

 private mountRoutes() {
   this.app.get('/', (req, res) => {
     res.send('Bienvenidos a curso dev');
   });
   this.app.use('/v1/user', userRouter)
   this.app.use('/v1/menu', menuRouter)
   this.app.use('/v1/listas', listaRouter)
   this.app.use('/v1/listaDetalle', listaDetalleRouter)
   this.app.use('/v1/roles', rolesRouter)
   this.app.use('/v1/paths', pathsRouter)
   this.app.use('/v1/auth', authRouter)
  }

  getApp() {
    return this.app;
  }
}

const app = new App().getApp();

export { app };

