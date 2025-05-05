import { Request, Response } from "express";
import { ValidatorBody } from "../../../core/utils/decorator.service";
import { AuthAplication } from "../application/auth.application";
import { AuthD } from "../models/auth";
import { AuthLoginValidator } from "./auth-validators/auth-login.dto";

export class AuthController{
    constructor(private readonly application: AuthAplication) { }
         @ValidatorBody(AuthLoginValidator)
          async login(request: Request, response: Response) {
               
             const { email, password } = request.body;

            
             const authDomain: AuthD = {
                 email,
                 password
             };

             const tokens:any = await this.application.login(authDomain)

             if (!tokens) {
                 response.status(401).json(null);
                 
             } else {
                 response.status(200).json(tokens);
             };            
             
        };

}