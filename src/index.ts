import 'reflect-metadata';
import { app } from './app';
import { ServerBootstrap } from './bootstrap/server.bootstrap';
import { LoggerService } from './common/logger';
const logger = new LoggerService();


import { envs } from './config/environment-vars';
const dbConfig = envs.db;
import { Database } from './bootstrap/database.bootstrap';
const database = Database.getInstance(dbConfig);
const serverBootstrap = new ServerBootstrap(app);

async function start() {
  
  try {
    await Promise.allSettled([
      serverBootstrap.initialize(),
      database.connect()
    ])
    
    await database.close();
} catch (error: unknown) {

  if (error instanceof Error) {
    logger.info(`Error: ${(error).message}`)
  } else {
    logger.error(`An error ocurred':${error}`);
  }
  
  }
};

start();
