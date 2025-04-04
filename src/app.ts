import express from 'express';
import { userRouter } from './modules/user/ports/presentation/user.routes';
import { ResponseJson } from './core/interceptors/response-json.interceptor';


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
   this.app.use('/user', userRouter)
  }

  getApp() {
    return this.app;
  }
}

const app = new App().getApp();

export { app };

