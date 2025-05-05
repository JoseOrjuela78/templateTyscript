
import { ResultI } from "../../../core/adapter/operarations.model";
import { PageResult } from "../../../core/interfaces/page-results";
import { AuthD } from "../models/auth";
import { AuthPort, Tokens } from "../ports/auth.port";


export class AuthAdapter implements AuthPort{
   protected operations: any

  constructor(
        oper: any
    
  ) { 
     this.operations = oper;
  }

   async  login(auth: AuthD): Promise<Tokens | null> {

     return null

  }
  
 async  getPaths(id_usuario: number): Promise<PageResult<any>> {
     const result: ResultI = await this.operations.getPaths(id_usuario);
             
             if (result.TOTAL_ROWS && result.TOTAL_ROWS > 0) {
     
                 return {
                     STATUS_CODE: result.STATUS_CODE,
                     STATUS_DESC: result.STATUS_DESC,
                     data: result.DATA,
                     page: 0,
                     pageSize: 0,
                     total: result.TOTAL_ROWS
                 }
                 
             }
     
             return {
                 STATUS_CODE: result.STATUS_CODE,
                 STATUS_DESC: result.STATUS_DESC,
                 data: [],
                 page: 0,
                 pageSize: 0,
                 total: 0
             };
   }

}