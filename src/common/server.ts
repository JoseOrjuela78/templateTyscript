import https from 'https';
import http from 'http';
import { Ihttps } from './models/IhttpOptions';
import { Application } from "express";

export default class Server{
  
    constructor(
                private readonly app: Application, 
                private readonly port: number,
                private readonly https_options: Ihttps
               ){}

   initialize(){
        return new Promise((resolve,reject)=>{
             if(this.https_options.key === ''){
            http.createServer({},this.app)
                .listen(this.port)
                .on('listening',()=>{
                    resolve(true);
                    console.log('Servidor http corriendo en puerto : ', this.port);
                })
                .on('error',(error: NodeJS.ErrnoException)=>{
                    reject(error);
                    console.log(`Error:${error.message}`);
                })
        }else{
            
            https.createServer(this.https_options,this.app)
                .listen(this.port)
                .on('listening',()=>{
                    resolve(true);
                    console.log('Servidor https corriendo en puerto : ', this.port);
                })
                .on('error',(error: NodeJS.ErrnoException)=>{
                     reject(error);
                })
        };

        });
    };
}