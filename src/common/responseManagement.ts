import { Request, Response } from "express";
import logger from "./logger";
import e from "./config/enviroment-vars";

 export const responseResult = (req:Request, res: Response, code:number, message:string, data:any) =>{

    logger.info(`${req.method}-${req.originalUrl} message: ${message} data : ${JSON.stringify(data)}`);
    return res.status(code).json({
        app: e.envs.APP,
        status: true,
        message,
        data
    })

};

export const responseError = (req:Request, res: Response, code:number, message:string) =>{

    logger.error(`${req.method}-${req.originalUrl} code:${code} message: ${message}`);
    return res.status(code).json({
        app: e.envs.APP,
        status: false,
        message
    })

};

