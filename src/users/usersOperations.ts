import msDatabase from "../common/database/data-mssql";
import { ILogin } from "./port/models/ILogin";
import { IUserDb } from "./port/models/IUserDb";
import { IUserDom } from "./port/models/IUserDom";
import { IUsersSearchFilters } from "./port/models/IUsersSearchFilters";
import { UserDto } from "./port/userDto";
import sql from 'mssql';

class UserOperations {
  
    constructor(private readonly db: typeof msDatabase){}

    async createUser(user:IUserDom){
       try {
            
            const userdb:IUserDb = UserDto.FromDomainToDb(user) as IUserDb;
     
            const result:any = await this.db.executeStoredProcedure(
                'SP_CREAR_USUARIO',
                {
                    TIPO_PERSONA:        { type: sql.Int,     value: userdb.TIPO_PERSONA },
                    TIPO_IDENTIFICACION: { type: sql.Int,     value: userdb.TIPO_IDENTIFICACION},
                    IDENTIFICACION:      { type: sql.VarChar, value: userdb.IDENTIFICACION },
                    RAZON_SOCIAL:        { type: sql.VarChar, value: userdb.RAZON_SOCIAL },
                    NOMBRE1:             { type: sql.VarChar, value: userdb.NOMBRE1 },
                    NOMBRE2:             { type: sql.VarChar, value: userdb.NOMBRE2 },
                    APELLIDO1:           { type: sql.VarChar, value: userdb.APELLIDO1 },
                    APELLIDO2:           { type: sql.VarChar, value: userdb.APELLIDO2 },
                    EMAIL:               { type: sql.VarChar, value: userdb.EMAIL },
                    GENERO:              { type: sql.Int,     value: userdb.GENERO },
                    CIUDAD:              { type: sql.Int,     value: userdb.CIUDAD },	
                    TELEFONO:            { type: sql.VarChar, value: userdb.TELEFONO },
                    ID_ROL:              { type: sql.Int,     value: userdb.ID_ROL },
                    PASS:                { type: sql.VarChar, value: userdb.PASS },
                    ID_USUARIO:          { type: sql.Int,     value: userdb.ID_USUARIO }
                },
                {
                    CODIGO:      sql.Int,
                    STATUS_CODE: sql.Int,
                    STATUS_DESC: sql.VarChar(500)
                }
        );
            return {
                status_code: result.STATUS_CODE,
                status_desc: result.STATUS_DESC,
                code: result.CODIGO
            };

       } catch (error:any) {
            return {
                    status_code: error.code,
                    status_desc: error.message
                   };
       }; 
       
    };

    async updateUser(user:IUserDom){
       try {
            
            const userdb:IUserDb = UserDto.FromDomainToDb(user) as IUserDb;
     
            const result:any = await this.db.executeStoredProcedure(
                'SP_ACTUALIZAR_USUARIO',
                {
                    TIPO_PERSONA:        { type: sql.Int,     value: userdb.TIPO_PERSONA },
                    TIPO_IDENTIFICACION: { type: sql.Int,     value: userdb.TIPO_IDENTIFICACION},
                    IDENTIFICACION:      { type: sql.VarChar, value: userdb.IDENTIFICACION },
                    RAZON_SOCIAL:        { type: sql.VarChar, value: userdb.RAZON_SOCIAL },
                    NOMBRE1:             { type: sql.VarChar, value: userdb.NOMBRE1 },
                    NOMBRE2:             { type: sql.VarChar, value: userdb.NOMBRE2 },
                    APELLIDO1:           { type: sql.VarChar, value: userdb.APELLIDO1 },
                    APELLIDO2:           { type: sql.VarChar, value: userdb.APELLIDO2 },
                    EMAIL:               { type: sql.VarChar, value: userdb.EMAIL },
                    GENERO:              { type: sql.Int,     value: userdb.GENERO },
                    CIUDAD:              { type: sql.Int,     value: userdb.CIUDAD },	
                    TELEFONO:            { type: sql.VarChar, value: userdb.TELEFONO },
                    ID_ROL:              { type: sql.Int,     value: userdb.ID_ROL },
                    ID_USUARIO:          { type: sql.Int,     value: userdb.ID_USUARIO }
                },
                {
                    STATUS_CODE: sql.Int,
                    STATUS_DESC: sql.VarChar(500)
                }
        );
            return {
                status_code: result.STATUS_CODE,
                status_desc: result.STATUS_DESC
            };

       } catch (error:any) {
            return {
                    status_code: error.code,
                    status_desc: error.message
                   };
       }; 
       
    };

    async updateStatusUser(id:string, sts:number, exe:number){
       try {
            
            const result:any = await this.db.executeStoredProcedure(
                'SP_ESTADO_USUARIO',
                {
                   
                    IDENTIFICACION: { type: sql.VarChar, value: id},
                    ESTADO:         { type: sql.Int,     value: sts },
                    ID_USUARIO:     { type: sql.Int,     value: exe }
                },
                {
                    STATUS_CODE: sql.Int,
                    STATUS_DESC: sql.VarChar(500)
                }
        );
            return {
                status_code: result.STATUS_CODE,
                status_desc: result.STATUS_DESC
            };

       } catch (error:any) {
            return {
                    status_code: error.code,
                    status_desc: error.message
                   };
       }; 
       
    };

    async updatePassUser(id:number, pass:number, exe:number){
       try {
            
            const result:any = await this.db.executeStoredProcedure(
                'SP_ACTUALIZAR_PASSWORD',
                {
                 ID_USUARIO: { type: sql.Int, value: id },
                 PASS: { type: sql.VarChar, value: pass },
                 ID_USUARIO_EJECUTO: { type: sql.Int, value: exe }
                },
                {
                    STATUS_CODE: sql.Int,
                    STATUS_DESC: sql.VarChar(500)
                }
        );
            return {
                status_code: result.STATUS_CODE,
                status_desc: result.STATUS_DESC
            };

       } catch (error:any) {
            return {
                    status_code: error.code,
                    status_desc: error.message
                   };
       }; 
       
    };

      async getUsersPag (filters:IUsersSearchFilters){
       try {
            
            const result:any = await this.db.executeStoredProcedure(
                'PR_GET_USUARIOS',
                {
                    ORDERCOLUMN: { type: sql.VarChar, value: filters.ordercolumn },
                    ORDERDIRECTION: { type: sql.VarChar, value: filters.orderdirection },
                    PAGENUMBER: { type: sql.Int, value: filters.pagenumber },
                    PAGESIZE: { type: sql.Int, value: filters.pagesize },
                    IDENTIFICACION: { type: sql.VarChar, value: filters.identificacion },
                    ID_USUARIO: { type: sql.Int, value: filters.id_usuario },
                    TIPO_PERSONA: { type: sql.Int, value: filters.tipo_persona },
                    TIPO_IDENTIFICACION: { type: sql.Int, value: filters.tipo_identificacion },
                    RAZON_SOCIAL: { type: sql.VarChar, value: filters.razon_social },
                    NOMBRE: { type: sql.VarChar, value: filters.nombre },
                    EMAIL: { type: sql.VarChar, value: filters.email },
                    GENERO: { type: sql.Int, value: filters.genero },
                    CIUDAD: { type: sql.Int, value: filters.ciudad },
                    TELEFONO: { type: sql.VarChar, value: filters.telefono },
                    ID_ROL: { type: sql.Int, value: filters.id_rol },
                    ESTADO: { type: sql.Int, value: filters.estado },
                    FECHAINICIO: { type: sql.VarChar, value: filters.fechainicio },
                    FECHAFINAL: { type: sql.VarChar, value: filters.fechafinal }
                },
                {
                    TOTALREGISTROS: sql.Int,
                    STATUS_CODE: sql.Int,
                    STATUS_DESC: sql.VarChar(500)
                }
            );

            const users = result.recordset[0];
            const usersDom:IUserDom[] = UserDto.FromDbToDomain(users) as IUserDom[];
            return {
                    status_code: result.output.STATUS_CODE,
                    status_desc: result.output.STATUS_DESC,
                    totalRegistros: result.output.TOTALREGISTROS,
                    users: usersDom
            };

       } catch (error:any) {
            return {
                    status_code: error.code,
                    status_desc: error.message
                   };
       }; 
       
    };

    async login(bd:ILogin){
       try {
            const result:any = await this.db.executeStoredProcedure(
                'PR_LOGIN',
                {
                email: { type: sql.VarChar, value: bd.email }
                },
                { 
                pass: sql.VarChar(100),
                status_code: sql.Int,
                status_desc: sql.VarChar(500)
                }
            );
        
            const user = result.recordsets[0][0];
            const menus = result.recordsets[1];
            const restricciones = result.recordsets[2];

            return {
                    pass: result.output.pass,
                    user,
                    menus,
                    restricciones,
                    status_code: result.output.status_code,
                    status_desc: result.output.status_desc
                   };

       } catch (error:any) {
            return {
                    status_code: error.code,
                    status_desc: error.message
                   };
       }; 
       
    };
}

export default UserOperations;