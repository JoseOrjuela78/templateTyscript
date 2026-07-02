
import { Request, Response } from 'express';
import operations from './usersOperations';
import { IUserDom } from './port/IUserDom';

export class UsersController {
    constructor(
        private readonly operation: typeof operations
    ){}

    async createUser(req:Request, res:Response){
        const user: IUserDom = req.body;
        const result = await this.operation.createUser(user);
        return res.status(200).json({result});
    }
};