import { LoggerService } from "../../../common/logger";
import { Db1 } from "../../../core/adapter/db1";
import { ResultI, ResultSet } from "../../../core/adapter/operarations.model";
import * as sql from 'mssql';
const logger = new LoggerService();

export class AuthOperations {
    private answer!: ResultI;
    
    constructor(private readonly db1: Db1) { }

     public async getPaths(id_usuario:number) {
            try {
                    
                        const query = `EXECUTE SP_USUARIOS_GET_PATHS 
                                      @ID_USUARIO`;
                
                        const params = {
                            ID_USUARIO:{ value: id_usuario, type: sql.Int },
                           
                          }; 
            
                        const queryResult:any = await this.db1.executeQuerydb1(query, params);
                        this.answer = ResultSet.fromResultToResulSet(queryResult);
                        return this.answer;
                        
                    } catch (error) {
                      
                        logger.error(`${new Date().toString()} Error Login connetion ${error}`);
                
                        this.answer = {
                                        STATUS_CODE: 500,
                                        STATUS_DESC: `${new Date().toString()} Error Login connetion ${error}`,
                                        DATA: []
                                        };
                        return this.answer;
                        
                    }
         }

}