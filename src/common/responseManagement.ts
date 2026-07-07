import { Request, Response } from "express";
import Logger from "./logger";
import e from "./config/enviroment-vars";

class ResponseManagenent {
   private log:Logger;
   private app:string;
    constructor(){
        this.log = new Logger();
        this.app = e.envs.APP;
    }

responseResult = (req:Request, res: Response, code:number, message:string, data:any) =>{

    this.log.info(`${req.method}-${req.originalUrl} code: ${code} message: ${message} data : ${JSON.stringify(data)}`);
    return res.status(code).json({
        app: this.app,
        status: true,
        message,
        data
    });
};

responseError = (req:Request, res: Response, code:number, message:string) =>{

    this.log.error(`${req.method}-${req.originalUrl} code:${code} message: ${message}`);
    return res.status(code).json({
        app: this.app,
        status: false,
        message
    })

};

}

export default ResponseManagenent;

