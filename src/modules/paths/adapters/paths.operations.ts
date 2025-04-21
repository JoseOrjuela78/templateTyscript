import { LoggerService } from "../../../common/logger";
import { Db1 } from "../../../core/adapter/db1";
import { ResultI, ResultSet } from "../../../core/adapter/operarations.model";
import { PathsE } from "../entities/model.paths.entity";
import * as sql from 'mssql';
const logger = new LoggerService();

export class PathsOperations { 
    private answer!: ResultI;

    constructor(private readonly db1: Db1) { }

     public async create(path: PathsE) {
                    try {
                    
                     const query = `EXECUTE SP_PATHS_CREATE
                                           @ID_MENU
                                          ,@PATH
                                          ,@ID_ACCION
                                          ,@USUARIO_EXE`;
                        
                        const params = {
                            ID_MENU: { value: path.ID_MENU , type: sql.Int },
                            PATH: { value: path.PATH, type: sql.VarChar(500) },
                            ID_ACCION: { value: path.ID_ACCION, type: sql.Int },
                            USUARIO_EXE: { value: path.USUARIO_EXE, type: sql.Int }
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
    
         public async update(path: PathsE) {
                    try {
                        
                        const query = `EXECUTE SP_PATHS_UPDATE
                                               @ID_PATH
                                              ,@ID_MENU
                                              ,@PATH
                                              ,@ID_ACCION
                                              ,@USUARIO_EXE`;
            
                        const params = {
                            ID_PATH: { value: path.ID_PATH , type: sql.Int },
                            ID_MENU: { value: path.ID_MENU , type: sql.Int },
                            PATH: { value: path.PATH, type: sql.VarChar(500) },
                            ID_ACCION: { value: path.ID_ACCION, type: sql.Int },
                            USUARIO_EXE: { value: path.USUARIO_EXE, type: sql.Int }
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
    
      public async inactivate(idPath:number, status:number, user_exe: number) {
                    try {
                        
                        const query = `EXECUTE SP_PATHS_STATUS
                                               @ID_PATH
                                              ,@ESTADO
                                              ,@USUARIO_EXE`;
                        
                        const params = {
                            ID_PATH :{value: idPath ,type: sql.Int},
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
                                ID_MENU: null,
                                PATH: null,
                                ID_ACCION: null
                                };
    
                if (Array.isArray(filtros) && filtros.length > 0) {
                    filtros.forEach(item => {
                    Object.assign(filters, {
                                F_INICIAL: item.F_INICIAL ?? filters.F_INICIAL,
                                F_FINAL: item.F_FINAL ?? filters.F_FINAL,
                                ID_MENU: item.ID_MENU ?? filters.ID_MENU,
                                PATH: item.PATH ?? filters.PATH,
                                ID_ACCION: item.ID_ACCION ?? filters.ID_ACCION
                                           });
                            });
                };
    
         
                const query = `EXECUTE SP_PATHS_GET
                                       @PAGE_NUMBER
                                      ,@PAGE_SIZE
                                      ,@F_INICIAL
                                      ,@F_FINAL
                                      ,@ID_PATH
                                      ,@ID_MENU
                                      ,@PATH
                                      ,@ID_ACCION
                                      ,@ESTADO`;
                
                        const params = {
                            PAGE_NUMBER: { value: page, type: sql.Int },
                            PAGE_SIZE: { value: pageSize, type: sql.Int },
                            F_INICIAL: { value: filters.F_INICIAL, type: sql.Date },
                            F_FINAL: { value: filters.F_FINAL, type: sql.Date },
                            ID_PATH: { value: id, type: sql.Int },
                            ID_MENU:{ value: filters.ID_MENU, type: sql.Int },
                            PATH: { value: filters.PATH, type: sql.VarChar(500) },
                            ID_ACCION: { value: filters.ID_ACCION, type: sql.Int },
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
           

}