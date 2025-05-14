import { Db1 } from "../../../core/adapter/db1";
import * as sql from 'mssql';
import { MenuE } from "../entities/model.menu.entity";
import { LoggerService } from "../../../common/logger";
import { ResultI, ResultSet } from "../../../core/adapter/operarations.model";
const logger = new LoggerService();


export class MenuOperations {
     
    private answer!: ResultI;
    constructor(private readonly db1: Db1) { }
    
  
   public async create(menu: MenuE) {
        try {
        
         const query = `EXEC SP_MENUS_CREATE
                              @MENU_TITULO
                              ,@TIPO
                              ,@ICONO
                              ,@URL
                              ,@DEPENDE
                              ,@JsonInput
                              ,@USUARIO_EXE
                              `;

             
            const params = {
                MENU_TITULO:{value: menu.MENU_TITULO ,type: sql.VarChar(50)},
                TIPO:{value: menu.TIPO,type: sql.VarChar(20)},
                ICONO:{value: menu.ICONO,type: sql.VarChar(20)},
                URL:{value: menu.URL,type: sql.VarChar(100)},
                DEPENDE: { value: menu.DEPENDE, type: sql.Int },
                JsonInput: { value: JSON.stringify(menu.JsonInput), type: sql.NVarChar(1000) },
                USUARIO_EXE: { value: menu.USUARIO_EXE, type: sql.Int }
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


   public async update(menu: MenuE) {
        try {
            
            const query = `EXEC SP_MENUS_UPDATE 
                                       @ID_MENU
                                       ,@MENU_TITULO
                                       ,@TIPO
                                       ,@ICONO
                                       ,@URL
                                       ,@DEPENDE
                                       ,@USUARIO_EXE`;

            const params = {
                ID_MENU :{value: menu.ID_MENU ,type: sql.Int},
                MENU_TITULO:{value: menu.MENU_TITULO ,type: sql.VarChar(50)},
                TIPO:{value: menu.TIPO,type: sql.VarChar(20)},
                ICONO:{value: menu.ICONO,type: sql.VarChar(20)},
                URL:{value: menu.URL,type: sql.VarChar(100)},
                DEPENDE:{value: menu.DEPENDE,type: sql.Int},
                USUARIO_EXE: { value: menu.USUARIO_EXE, type: sql.Int }
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

   public async inactivate(idMenu:number, status:number, user_exe: number) {
        try {
            
            const query = `EXEC SP_MENUS_STATUS 
                                   @ID_MENU
                                   ,@ESTADO
                                   ,@USUARIO_EXE`;
            const params = {
                ID_MENU :{value: idMenu ,type: sql.Int},
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
                MENU_TITULO: null,
                TIPO: null,
                ICONO: null,
                URL: null,
                DEPENDE: null
                };

           if (Array.isArray(filtros) && filtros.length > 0) {
                    filtros.forEach(item => {
                    Object.assign(filters, {
                                F_INICIAL: item.F_INICIAL ?? filters.F_INICIAL,
                                F_FINAL: item.F_FINAL ?? filters.F_FINAL,
                                MENU_TITULO: item.MENU_TITULO ?? filters.MENU_TITULO,
                                TIPO: item.TIPO ?? filters.TIPO,
                                ICONO: item.ICONO ?? filters.ICONO,
                                URL: item.URL ?? filters.URL,
                                DEPENDE: item.DEPENDE ?? filters.DEPENDE
                                   });
                            });
              };

            const query = `EXEC SP_MENUS_GET 
                                @PAGE_NUMBER
                                ,@PAGE_SIZE
                                ,@F_INICIAL
                                ,@F_FINAL
                                ,@ID_MENU
                                ,@MENU_TITULO
                                ,@TIPO
                                ,@ICONO
                                ,@URL
                                ,@DEPENDE
                                ,@ESTADO`;
            const params = {
                PAGE_NUMBER: { value: page, type: sql.Int },
                PAGE_SIZE: { value: pageSize, type: sql.Int },
                F_INICIAL: { value: filters.F_INICIAL, type: sql.Date },
                F_FINAL: { value: filters.F_FINAL, type: sql.Date },
                ID_MENU : { value: id, type: sql.Int},
                MENU_TITULO: { value: filters.MENU_TITULO, type: sql.VarChar(50) },
                TIPO: { value: filters.TIPO, type: sql.VarChar(20)},
                ICONO: { value: filters.ICONO, type: sql.VarChar(20)},
                URL: { value: filters.URL, type: sql.VarChar(100) },
                DEPENDE: { value: filters.DEPENDE, type: sql.Int },
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


    public async getActivateMenus() {
        try {
            const result: any = await this.getPag(null, null, null, 1, []);
    
            result.DATA = result.DATA
                .map((menu: any) => ({
                    ...menu,
                    CHILDREN: menu.DEPENDE === 0
                        ? result.DATA.filter((child: any) => child.DEPENDE === menu.ID_MENU)
                        : []
                }))
                .filter((menu: any) => menu.DEPENDE === 0); // Filtramos solo los elementos principales
    
            return result;
        } catch (error) {
            const errorMessage = `${new Date().toString()} Error Login connection ${error}`;
            logger.error(errorMessage);
    
            return {
                STATUS_CODE: 500,
                STATUS_DESC: errorMessage,
                DATA: []
            };
        }
    }



};









