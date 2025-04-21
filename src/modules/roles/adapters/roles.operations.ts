import { LoggerService } from "../../../common/logger";
import { Db1 } from "../../../core/adapter/db1";
import { ResultI, ResultSet } from "../../../core/adapter/operarations.model";
import { RolesE } from "../entities/model.roles.entity";
import * as sql from 'mssql';
const logger = new LoggerService();



export class RolesOperations { 

    private answer!: ResultI;
    
    constructor(private readonly db1: Db1) { }
    
      public async create(rol: RolesE) {
                    try {
                    
                     const query = `EXECUTE SP_ROLES_CREATE
                                               @NOMBRE_ROL
                                              ,@USUARIO_EXE`;
                        
                        const params = {
                            NOMBRE_ROL: { value: rol.NOMBRE_ROL, type: sql.VarChar(50) },
                            USUARIO_EXE: { value: rol.USUARIO_EXE, type: sql.Int }
                          };
            
                        const queryResult: any = await this.db1.executeQuerydb1(query, params);
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
    
    public async update(rol: RolesE) {
                    try {
                        
                        const query = `EXECUTE SP_ROLES_UPDATE
                                               @ID_ROL
                                              ,@NOMBRE_ROL
                                              ,@USUARIO_EXE`;
            
                        const params = {
                            ID_ROL: { value: rol.ID_ROL, type: sql.Int },
                            NOMBRE_ROL: { value: rol.NOMBRE_ROL, type: sql.VarChar(50) },
                            USUARIO_EXE: { value: rol.USUARIO_EXE, type: sql.Int }
                        }; 
            
                        const queryResult = await this.db1.executeQuerydb1(query, params);
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

      public async inactivate(id_rol:number, status:number, user_exe: number) {
                    try {
                        
                        const query = `EXECUTE SP_ROLES_STATUS
                                               @ID_ROL
                                              ,@ESTADO
                                              ,@USUARIO_EXE`;
                        
                        const params = {
                            ID_ROL :{value: id_rol ,type: sql.Int},
                            ESTADO:{value: status, type: sql.Bit},
                            USUARIO_EXE: { value:user_exe, type: sql.Int }
                        }; 
            
                        const queryResult = await this.db1.executeQuerydb1(query, params);
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
    
    public async getPag(page:any,pageSize:any,id:any,status:any,filtros:any) {
            try {
                    
                const filters = {
                                F_INICIAL: null,
                                F_FINAL: null,
                                NOMBRE_ROL: null
                                };
    
                if (Array.isArray(filtros) && filtros.length > 0) {
                    filtros.forEach(item => {
                    Object.assign(filters, {
                                F_INICIAL: item.F_INICIAL ?? filters.F_INICIAL,
                                F_FINAL: item.F_FINAL ?? filters.F_FINAL,
                                NOMBRE_ROL: item.NOMBRE_ROL ?? filters.NOMBRE_ROL
                                           });
                            });
                };
    
         
                const query = `EXECUTE SP_ROLES_GET 
                                       @PAGE_NUMBER
                                      ,@PAGE_SIZE
                                      ,@F_INICIAL
                                      ,@F_FINAL
                                      ,@ID_ROL
                                      ,@NOMBRE_ROL
                                      ,@ESTADO`;
                
                        const params = {
                            PAGE_NUMBER: { value: page, type: sql.Int },
                            PAGE_SIZE: { value: pageSize, type: sql.Int },
                            F_INICIAL: { value: filters.F_INICIAL, type: sql.Date },
                            F_FINAL: { value: filters.F_FINAL, type: sql.Date },
                            ID_ROL: { value: id, type: sql.Int },
                            NOMBRE_ROL: { value: filters.NOMBRE_ROL, type: sql.VarChar(50) },
                            ESTADO : { value: status, type: sql.Int }
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

};