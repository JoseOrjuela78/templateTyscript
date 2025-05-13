import { Db1 } from "../../../core/adapter/db1";
import * as sql from 'mssql';
import { UserE } from "../entities/model.user.entity";
import { LoggerService } from "../../../common/logger";
import { ResultI, ResultSet } from "../../../core/adapter/operarations.model";
const logger = new LoggerService();


export class UserOperations {

   private answer!: ResultI;
   constructor(private readonly db1: Db1) { }
    
   public async create(user: UserE) {
        try {
            
            const query = `EXECUTE SP_USUARIOS_CREATE 
                                   @ID_TIPO_DOC
                                  ,@IDENTIFICACION
                                  ,@NOMBRE_COMPLETO
                                  ,@CIIU_ACTIVIDAD
                                  ,@DANE_MUNICIPIO
                                  ,@F_NACIMIENTO
                                  ,@EMAIL
                                  ,@ID_ROL
                                  ,@PEP
                                  ,@PASS
                                  ,@USUARIO_EXE
                                  ,@REFRESHTOKEN`;
            
            const params = {
                    ID_TIPO_DOC:{value: user.ID_TIPO_DOC,type: sql.Int},
                    IDENTIFICACION: { value: user.IDENTIFICACION, type: sql.VarChar(25) },
                    NOMBRE_COMPLETO: { value: user.NOMBRE_COMPLETO, type: sql.VarChar(200) },
                    CIIU_ACTIVIDAD: { value: user.CIIU_ACTIVIDAD, type: sql.VarChar(25)},
                    DANE_MUNICIPIO: { value: user.DANE_MUNICIPIO, type: sql.VarChar(25) },
                    F_NACIMIENTO: { value: user.F_NACIMIENTO, type: sql.Date },
                    EMAIL: { value: user.EMAIL, type: sql.VarChar(50) },
                    ID_ROL: { value: user.ID_ROL, type: sql.Int },
                    PEP: { value: user.PEP, type: sql.Bit },
                    PASS: { value: user.PASS, type: sql.VarChar(200) },
                    USUARIO_EXE: { value: user.USUARIO_EXE, type: sql.Int },
                    REFRESHTOKEN: { value: user.REFRESHTOKEN, type: sql.VarChar(100) }
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

   public async update(user: UserE) {
          try {
              
              const query = `EXECUTE SP_USUARIOS_UPDATE
                                       @ID_USUARIO
                                      ,@ID_TIPO_DOC
                                      ,@IDENTIFICACION
                                      ,@NOMBRE_COMPLETO
                                      ,@DANE_MUNICIPIO
                                      ,@CIIU_ACTIVIDAD
                                      ,@F_NACIMIENTO
                                      ,@EMAIL
                                      ,@ID_ROL
                                      ,@PEP
                                      ,@PASS
                                      ,@USUARIO_EXE
                                      ,@REFRESHTOKEN`;
  
              const params = {
                              ID_USUARIO: { value: user.ID_USUARIO, type: sql.Int },
                              ID_TIPO_DOC:{value: user.ID_TIPO_DOC,type: sql.Int},
                              IDENTIFICACION: { value: user.IDENTIFICACION, type: sql.VarChar(25) },
                              NOMBRE_COMPLETO: { value: user.NOMBRE_COMPLETO, type: sql.VarChar(200) },
                              DANE_MUNICIPIO: { value: user.DANE_MUNICIPIO, type: sql.VarChar(25) },
                              CIIU_ACTIVIDAD: { value: user.CIIU_ACTIVIDAD, type: sql.VarChar(25)},
                              F_NACIMIENTO: { value: user.F_NACIMIENTO, type: sql.Date },
                              EMAIL: { value: user.EMAIL, type: sql.VarChar(50)},
                              ID_ROL: { value: user.ID_ROL, type: sql.Int },
                              PEP: { value: user.PEP, type: sql.Bit },
                              PASS: { value: user.PASS, type: sql.VarChar(200) },
                              USUARIO_EXE: { value: user.USUARIO_EXE, type: sql.Int },
                              REFRESHTOKEN: { value: user.REFRESHTOKEN, type: sql.VarChar(100) }
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

    public async inactivate(idUsuario:number, status:number, user_exe: number) {
         try {
             
             const query = `EXECUTE SP_USUARIOS_STATUS 
                                       @ID_USUARIO
                                      ,@ESTADO
                                      ,@USUARIO_EXE`;
             
             const params = {
                 ID_USUARIO :{value: idUsuario ,type: sql.Int},
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
                            ID_PERSONA: null,
                            ID_ROL: null,
                            ID_TIPO_DOC: null,
                            IDENTIFICACION: null,
                            NOMBRE_COMPLETO: null,
                            CIIU_ACTIVIDAD: null,
                            DANE_MUNICIPIO: null,
                            EMAIL: null,
                            REFRESHTOKEN: null
                            };

            if (Array.isArray(filtros) && filtros.length > 0) {
                filtros.forEach(item => {
                Object.assign(filters, {
                            F_INICIAL: item.F_INICIAL ?? filters.F_INICIAL,
                            F_FINAL: item.F_FINAL ?? filters.F_FINAL,
                            ID_PERSONA: item.ID_PERSONA ?? filters.ID_PERSONA,
                            ID_ROL: item.ID_ROL ?? filters.ID_ROL,
                            ID_TIPO_DOC: item.ID_TIPO_DOC ?? filters.ID_TIPO_DOC,
                            NOMBRE_COMPLETO: item.NOMBRE_COMPLETO ?? filters.NOMBRE_COMPLETO,
                            CIIU_ACTIVIDAD: item.CIIU_ACTIVIDAD ?? filters.CIIU_ACTIVIDAD,
                            DANE_MUNICIPIO: item.DANE_MUNICIPIO ?? filters.DANE_MUNICIPIO,
                            EMAIL: item.EMAIL ?? filters.EMAIL,
                            REFRESHTOKEN: item.REFRESHTOKEN ?? filters.REFRESHTOKEN
                                       });
                        });
            };

     
            const query = `EXECUTE SP_USUARIOS_GET 
                                   @PAGE_NUMBER
                                  ,@PAGE_SIZE
                                  ,@F_INICIAL
                                  ,@F_FINAL
                                  ,@ID_USUARIO
                                  ,@ID_PERSONA
                                  ,@ID_ROL
                                  ,@ESTADO
                                  ,@ID_TIPO_DOC
                                  ,@IDENTIFICACION
                                  ,@NOMBRE_COMPLETO
                                  ,@CIIU_ACTIVIDAD
                                  ,@DANE_MUNICIPIO
                                  ,@EMAIL
                                  ,@REFRESHTOKEN`;
            
                    const params = {
                        PAGE_NUMBER: { value: page, type: sql.Int },
                        PAGE_SIZE: { value: pageSize, type: sql.Int },
                        F_INICIAL: { value: filters.F_INICIAL, type: sql.Date },
                        F_FINAL: { value: filters.F_FINAL, type: sql.Date },
                        ID_USUARIO:{ value: id, type: sql.Int },
                        ID_PERSONA: { value: filters.ID_PERSONA, type: sql.Int },
                        ID_ROL: { value: filters.ID_ROL, type: sql.Int },
                        ESTADO: { value: status, type: sql.Int },
                        ID_TIPO_DOC: { value: filters.ID_TIPO_DOC, type: sql.Int },
                        IDENTIFICACION: { value: filters.IDENTIFICACION, type: sql.VarChar(25) },
                        NOMBRE_COMPLETO: { value: filters.NOMBRE_COMPLETO, type: sql.VarChar(200) },
                        CIIU_ACTIVIDAD: { value: filters.CIIU_ACTIVIDAD, type: sql.VarChar(25) },
                        DANE_MUNICIPIO: { value: filters.DANE_MUNICIPIO, type: sql.VarChar(25) },   
                        EMAIL: { value: filters.EMAIL, type: sql.VarChar(50) },
                        REFRESHTOKEN : { value: filters.REFRESHTOKEN, type: sql.VarChar(100) }
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









