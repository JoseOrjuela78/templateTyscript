import { LoggerService } from "../../../common/logger";
import { Db1 } from "../../../core/adapter/db1";
import { ResultI, ResultSet } from "../../../core/adapter/operarations.model";
import { ListaE } from "../entities/model.lista.entity";
import * as sql from 'mssql';
const logger = new LoggerService();


export class ListasOperations { 
    private answer!: ResultI;

    constructor(private readonly db1: Db1) { }

    public async create(lista: ListaE) {
            try {
            
             const query = `EXECUTE SP_LISTAS_CREATE
                                    @NOMBRE_LISTA
                                   ,@DESCRIPCION_LISTA
                                   ,@USUARIO_EXE
                                  `;
                
                const params = {
                    NOMBRE_LISTA:{value: lista.NOMBRE_LISTA ,type: sql.VarChar(50)},
                    DESCRIPCION_LISTA:{value: lista.DESCRIPCION_LISTA,type: sql.VarChar(100)},
                    USUARIO_EXE: { value: lista.USUARIO_EXE, type: sql.Int }
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
    
    public async update(lista: ListaE) {
            try {
                
                const query = `EXECUTE SP_LISTAS_UPDATE 
                                       @ID_LISTA
                                      ,@NOMBRE_LISTA
                                      ,@DESCRIPCION_LISTA
                                      ,@USUARIO_EXE`;
    
                const params = {
                    ID_LISTA: { value: lista.ID_LISTA, type: sql.Int },
                    NOMBRE_LISTA: { value: lista.NOMBRE_LISTA, type: sql.VarChar(50) },
                    DESCRIPCION_LISTA:{value: lista.DESCRIPCION_LISTA,type: sql.VarChar(100)},
                    USUARIO_EXE: { value: lista.USUARIO_EXE, type: sql.Int }
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
    
    public async inactivate(idLista:number, status:number, user_exe: number) {
            try {
                
                const query = `EXECUTE SP_LISTAS_STATUS
                                       @ID_LISTA
                                      ,@ESTADO
                                      ,@USUARIO_EXE`;
                
                const params = {
                    ID_LISTA :{value: idLista ,type: sql.Int},
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
    
    public async getPag(page:any,pageSize:any,id:any,status:any) {
            try {
                
                const query = `EXECUTE SP_LISTAS_GET
                                       @PAGE_NUMBER
                                      ,@PAGE_SIZE
                                      ,@F_INICIAL
                                      ,@F_FINAL
                                      ,@ID_LISTA
                                      ,@NOMBRE_LISTA
                                      ,@ESTADO`;
                const params = {
                    PAGE_NUMBER: { value: page, type: sql.Int },
                    PAGE_SIZE: { value: pageSize, type: sql.Int },
                    F_INICIAL: { value: null, type: sql.Date },
                    F_FINAL: { value: null, type: sql.Date },
                    ID_LISTA : { value: id, type: sql.Int},
                    NOMBRE_LISTA: { value: null, type: sql.VarChar(50) },
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