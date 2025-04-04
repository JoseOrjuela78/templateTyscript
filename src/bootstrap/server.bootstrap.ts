import { Application } from 'express';
import http from 'http';
import { Bootstrap } from './bootstrap';
import { LoggerService } from '../common/logger';
const logger = new LoggerService();


export class ServerBootstrap implements Bootstrap{
    constructor(private readonly app: Application) { }
    
    initialize():Promise<boolean> {
        
        return new Promise((resolve, reject) => {

                const server = http.createServer(this.app);
                const port = process.env.PORT ?? 3100;
            
                server
                      .listen(port)
                    .on('listening', () => {
                        resolve(true);
                                logger.info(`Server is runnig on port ${port}`);
                          })
                    .on("error", (error: NodeJS.ErrnoException) => {
                        reject(error);
                                logger.error(`Error: ${error.message}`);
                      });
            
                    })
             }
        }