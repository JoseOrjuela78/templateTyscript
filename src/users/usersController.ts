
import { Request, Response } from 'express';
import operations from './usersOperations';
import { IUserDom } from './port/IUserDom';
import ResponseManagenent from '../common/responseManagement';
import Logger from '../common/logger';

export class UsersController {

    private resManagement:ResponseManagenent;
    private log:Logger;

    constructor(
        private readonly operation: typeof operations
    ){
        this.resManagement = new ResponseManagenent();
         this.log = new Logger();
      }

    async createUser(req:Request, res:Response){
        try {
            this.log.info(`${req.method}-${req.originalUrl} entry to createUser with body ${JSON.stringify(req.body)}`);
            const user: IUserDom = req.body;
            const result = await this.operation.createUser(user);
            return this.resManagement.responseResult(req,res,200,'User created',[]);
        } catch (error:any) {
            return this.resManagement.responseError(req,res,error.code,error.message,);
        };
    };
};