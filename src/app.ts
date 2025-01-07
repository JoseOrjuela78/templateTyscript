import express from 'express';


class App {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.mountRoutes();
  }


 private mountRoutes() {
   this.app.get('/', (req, res) => {
     res.send('Bienvenidos a curso dev');
   });
  }

  getApp() {
    return this.app;
  }
}

const app = new App().getApp();

export { app };

