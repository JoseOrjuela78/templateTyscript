import './config/environment-vars';
import { app } from './app';
import { ServerBootstrap } from './bootstrap/server.bootstrap';
import { DatabaseBootstrap } from './bootstrap/database.bootstrap';

const serverBootstrap = new ServerBootstrap(app);
const databaseBootstrap = new DatabaseBootstrap();

async function start() {
  
  try {
    await Promise.allSettled([
      serverBootstrap.initialize(),
      databaseBootstrap.initialize()
  ])
} catch (error: unknown) {

  if (error instanceof Error) {
    console.log(`Error: ${(error).message}`)
  } else {
    console.log('An error ocurred', error);
  }
  
  }
};

start();
