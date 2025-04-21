import { Db1 } from "../../../core/adapter/db1";
import * as sql from 'mssql';
import { UserE } from "../entities/model.user.entity";
import { LoggerService } from "../../../common/logger";
import { console } from "inspector";
const logger = new LoggerService();


export class UserOperations {


    constructor(private readonly db1: Db1) { }
    
    public async login(user: UserE){
        try {

            const query = `EXEC PR_LOGIN @username, @pass OUTPUT, @code OUTPUT, @message OUTPUT;`;
            const params = {
                username: { value: user.username, type: sql.VarChar(25) },
                pass:     { value: null, type: sql.VarChar(50), isOutput: true },
                code:     { value: null, type: sql.Int, isOutput: true },
                message:  { value: null, type: sql.VarChar(255), isOutput: true }
              };
               
            const queryResult = await this.db1.executeQuerydb1(query, params);
            
            if (queryResult) {
               const { result, output } = queryResult;
               return {
                    result,
                    output
                };
               
            };
                
                logger.error("login no recibió ningún resultado ");
                return {
                result: [],
                output: "login no recibió ningún resultado "
               };
           
               
        } catch (error) {
            logger.error(`${new Date().toString()} Error Login connetion ${error}`);
            return {
                result: [],
                output: `${new Date().toString()} Error Login connetion ${error}`
               };
        }
    
    };

   public async createUser(user: UserE) {
        try {
            
            const query = 'EXEC PR_CREAR_USUARIO @identificacion, @username, @nombre, @apellido, @telefono, @celular, @email, @pass, @rol, @code OUTPUT, @message OUTPUT';
            const params = {
                identificacion:{value: user.identificacion ,type: sql.VarChar(25)},
                username:{value: user.username,type: sql.VarChar(25)},
                nombre:{value: user.nombre,type: sql.VarChar(50)},
                apellido:{value: user.apellido,type: sql.VarChar(50)},
                telefono:{value: user.telefono,type: sql.VarChar(50)},
                celular:{value: user.celular,type: sql.VarChar(50)},
                email:{value: user.email,type: sql.VarChar(100)},
                pass:{value: user.pass,type: sql.VarChar(200)},
                rol:{value: user.rol,type: sql.Int},
                code:{value: null,type: sql.VarChar(50),isOutput: true},
                message:{value: null,type: sql.VarChar(50),isOutput: true}

            };

            const queryResult = await this.db1.executeQuerydb1(query, params);
            if (queryResult) {
                const { result, output } = queryResult;
                return {
                    result,
                    output
                };
            
            };
                

            logger.error("login no recibió ningún resultado ");
             return {
               result: [],
               output: "login no recibió ningún resultado "
             };

            
        } catch (error) {
          
          logger.error(`${new Date().toString()} Error Login connetion ${error}`);
            return {
                result: [],
                output: `${new Date().toString()} Error Login connetion ${error}`
               };
            
        }
    }

   public async updateUser(user: UserE) {
        try {
            
            const query = 'EXEC PR_UPDATE_USUARIO @identificacion,@nombre,@apellido,@telefono,@celular,@email,@pass,@rol,@estado,@code OUTPUT,@message OUTPUT';
            const params = {
                identificacion:{value: user.identificacion ,type: sql.VarChar(25)},
                nombre:{value: user.nombre,type: sql.VarChar(50)},
                apellido:{value: user.apellido,type: sql.VarChar(50)},
                telefono:{value: user.telefono,type: sql.VarChar(50)},
                celular:{value: user.celular,type: sql.VarChar(50)},
                email:{value: user.email,type: sql.VarChar(100)},
                pass:{value: user.pass,type: sql.VarChar(200)},
                rol: { value: user.rol, type: sql.Int },
                estado:{value: null,type: sql.Bit},
                code:{value: null,type: sql.VarChar(50),isOutput: true},
                message:{value: null,type: sql.VarChar(50),isOutput: true}
            }; 

            const queryResult = await this.db1.executeQuerydb1(query, params);
            
            if (queryResult) {
                const { result, output } = queryResult;
                return {
                    result,
                    output
                };
            
            };
                
            logger.error("login no recibió ningún resultado ");
             return {
               result: [],
               output: "login no recibió ningún resultado "
             };

            
        } catch (error) {
          
          logger.error(`${new Date().toString()} Error Login connetion ${error}`);
            return {
                result: [],
                output: `${new Date().toString()} Error Login connetion ${error}`
               };
            
        }
    }

   public async deleteUser(userId:string) {
        try {
            
            const query = 'EXEC PR_DELETE_USUARIO @identificacion, @code OUTPUT, @message OUTPUT';
            const params = {
                identificacion:{value: userId ,type: sql.VarChar(25)},
                code:{value: null,type: sql.VarChar(50),isOutput: true},
                message:{value: null,type: sql.VarChar(50),isOutput: true}
            }; 

            const queryResult = await this.db1.executeQuerydb1(query, params);
            
            if (queryResult) {
                const { result, output } = queryResult;
                return {
                    result,
                    output
                };
            
            };
                
            logger.error("login no recibió ningún resultado ");
             return {
               result: [],
               output: "login no recibió ningún resultado "
             };

            
        } catch (error) {
          
          logger.error(`${new Date().toString()} Error Login connetion ${error}`);
            return {
                result: [],
                output: `${new Date().toString()} Error Login connetion ${error}`
               };
            
        }
    }

   public async getId(userId:string) {
        try {
            
            const query = 'EXEC PR_GETID_USUARIO @identificacion, @code OUTPUT, @message OUTPUT';
            const params = {
                identificacion:{value: userId ,type: sql.VarChar(25)},
                code:{value: null,type: sql.VarChar(50),isOutput: true},
                message:{value: null,type: sql.VarChar(50),isOutput: true}
            }; 

            const queryResult = await this.db1.executeQuerydb1(query, params);
            
            if (queryResult) {
                const { result, output } = queryResult;
                return {
                    result,
                    output
                };
            
            };
                
            logger.error("login no recibió ningún resultado ");
             return {
               result: [],
               output: "login no recibió ningún resultado "
             };

            
        } catch (error) {
          
          logger.error(`${new Date().toString()} Error Login connetion ${error}`);
            return {
                result: [],
                output: `${new Date().toString()} Error Login connetion ${error}`
               };
            
        }
    }

   public async get(estado:number) {
        try {
            
            const query = 'EXEC PR_GET_USUARIOS @estado, @code OUTPUT, @message OUTPUT';
            const params = {
                estado:{value: estado ,type: sql.Bit},
                code:{value: null,type: sql.VarChar(50),isOutput: true},
                message:{value: null,type: sql.VarChar(50),isOutput: true}
            }; 

            const queryResult = await this.db1.executeQuerydb1(query, params);
            
            if (queryResult) {
                const { result, output } = queryResult;
                return {
                    result,
                    output
                };
            
            };
                
            logger.error("login no recibió ningún resultado ");
             return {
               result: [],
               output: "login no recibió ningún resultado "
             };

            
        } catch (error) {
          
          logger.error(`${new Date().toString()} Error Login connetion ${error}`);
            return {
                result: [],
                output: `${new Date().toString()} Error Login connetion ${error}`
               };
            
        }
    }

   public async getPag(page:any, pageSize:any, id:any, status:any) {
        try {
            
            const query = 'EXEC PR_GET_USUARIOS_PAG @page,@page_size, @estado,@total_rows, @code OUTPUT, @message OUTPUT';
            const params = {
                page: { value: page, type: sql.Int },
                page_size:{value: pageSize ,type: sql.Int},
                estado: { value: status, type: sql.Bit },
                total_rows: { value: status, type: sql.Int,isOutput: true},
                code:{value: null,type: sql.VarChar(50),isOutput: true},
                message:{value: null,type: sql.VarChar(50),isOutput: true}
            }; 

            const queryResult = await this.db1.executeQuerydb1(query, params);
            
            if (queryResult) {
                const { result, output } = queryResult;
                return {
                    result,
                    output
                };
            
            };
                
            logger.error("login no recibió ningún resultado ");
             return {
               result: [],
               output: "login no recibió ningún resultado "
             };

            
        } catch (error) {
          
          logger.error(`${new Date().toString()} Error Login connetion ${error}`);
            return {
                result: [],
                output: `${new Date().toString()} Error Login connetion ${error}`
               };
            
        }
    }
};









