import { LoggerService } from "../../../common/logger";
import { Db1 } from "../../../core/adapter/db1";
import { ResultI, ResultSet } from "../../../core/adapter/operarations.model";
import { ListaDetalleE } from "../entities/model.lista-det.entity";
import * as sql from 'mssql';
const logger = new LoggerService();




export class ListasDetalleOperations { 

    private answer!: ResultI;

    constructor(private readonly db1: Db1) { }

    public async create(listaDetalle: ListaDetalleE) {
                try {
                
                 const query = `EXECUTE SP_LISTAS_DETALLE_CREATE 
                                         @ID_LISTA
                                        ,@VALOR
                                        ,@PARAMETROS
                                        ,@USUARIO_EXE`;
                    
                    const params = {
                        ID_LISTA: { value: listaDetalle.ID_LISTA , type: sql.Int },
                        VALOR: { value: listaDetalle.VALOR, type: sql.VarChar(50) },
                        PARAMETROS: { value: listaDetalle.PARAMETROS, type: sql.VarChar(100) },
                        USUARIO_EXE: { value: listaDetalle.USUARIO_EXE, type: sql.Int }
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
    
      public async update(listaDetalle: ListaDetalleE) {
                try {
                    
                    const query = `EXECUTE SP_LISTAS_DETALLE_UPDATE
                                           @ID_LISTA_DET
                                          ,@ID_LISTA
                                          ,@VALOR
                                          ,@PARAMETROS
                                          ,@USUARIO_EXE`;
        
                    const params = {
                        ID_LISTA_DET:{value:listaDetalle.ID_LISTA_DET , type: sql.Int},
                        ID_LISTA: { value: listaDetalle.ID_LISTA, type: sql.Int },
                        VALOR: { value: listaDetalle.VALOR, type: sql.VarChar(50) },
                        PARAMETROS: { value: listaDetalle.PARAMETROS, type: sql.VarChar(100) },
                        USUARIO_EXE: { value: listaDetalle.USUARIO_EXE, type: sql.Int }
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
    
    public async inactivate(idListaDetalle:number, status:number, user_exe: number) {
                try {
                    
                    const query = `EXECUTE SP_LISTAS_DETALLE_STATUS
                                           @ID_LISTA_DET
                                          ,@ESTADO
                                          ,@USUARIO_EXE`;
                    
                    const params = {
                        ID_LISTA_DET :{value: idListaDetalle ,type: sql.Int},
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
                            ID_LIST_DET: null,
                            VALOR: null,
                            PARAMETROS: null
                            };

            if (Array.isArray(filtros) && filtros.length > 0) {
                filtros.forEach(item => {
                Object.assign(filters, {
                            F_INICIAL: item.F_INICIAL ?? filters.F_INICIAL,
                            F_FINAL: item.F_FINAL ?? filters.F_FINAL,
                            ID_LIST_DET: item.ID_LIST_DET ?? filters.ID_LIST_DET,
                            VALOR: item.VALOR ?? filters.VALOR,
                            PARAMETROS: item.PARAMETROS ?? filters.PARAMETROS
                                       });
                        });
            };

     
            const query = `EXECUTE SP_LISTAS_DETALLE_GET 
                                           @PAGE_NUMBER
                                          ,@PAGE_SIZE
                                          ,@F_INICIAL
                                          ,@F_FINAL
                                          ,@ID_LISTA_DET
                                          ,@ID_LISTA
                                          ,@VALOR
                                          ,@PARAMETROS
                                          ,@ESTADO`;
                    const params = {
                        PAGE_NUMBER: { value: page, type: sql.Int },
                        PAGE_SIZE: { value: pageSize, type: sql.Int },
                        F_INICIAL: { value: filters.F_INICIAL, type: sql.Date },
                        F_FINAL: { value: filters.F_FINAL, type: sql.Date },
                        ID_LISTA_DET: { value: filters.ID_LIST_DET, type: sql.Int },
                        ID_LISTA:{ value: id, type: sql.Int },
                        VALOR: { value: filters.VALOR, type: sql.VarChar(50) },
                        PARAMETROS: { value: filters.PARAMETROS, type: sql.VarChar(100) },
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