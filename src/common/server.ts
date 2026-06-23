import https from 'https';
import http from 'http';
import { Ihttps } from './models/IhttpOptions';
import { Application } from "express";

export default class Server{
    private port: number;
    private https_options: Ihttps;
    private app: Application;
  
    constructor(app: Application, port: number){
        this.app = app;
        this.port = port;
        this.https_options = {
             key: '',
             cert: ''
        };
    }

   listen(){
        if(this.https_options.key === ''){
            http.createServer({},this.app)
                .listen(this.port)
                .on('listening',()=>{
                    console.log('Servidor http corriendo en puerto : ', this.port);
                })
                .on('error',(error: NodeJS.ErrnoException)=>{
                    console.log(`Error:${error.message}`);
                })
        }else{
            
            https.createServer(this.https_options,this.app)
                .listen(this.port)
                .on('listening',()=>{
                    console.log('Servidor https corriendo en puerto : ', this.port);
                })
                .on('error',(error: NodeJS.ErrnoException)=>{
                    console.log(`Error:${error.message}`);
                })
        };
    };
}