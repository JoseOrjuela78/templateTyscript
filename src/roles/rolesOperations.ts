import msDatabase from "../common/database/data-mssql";
import sql from 'mssql';
import { IRol } from "./port/models/IRol";
import { IUpRol } from "./port/models/IUpRol";
import { IRestriction } from "./port/models/IRestriction";
import { IRolesSearchFilters } from "./port/models/IRolesSearchFilters";
import { IRestrictionSearchFilters } from "./port/models/IRestrictionSearchFilters";
import { IPermits } from "./port/models/IPermits";


class RolesOperations {
    constructor(private readonly db: typeof msDatabase){}
//ROLES
    async createPermisosRol(permits:IPermits){
        try {
            const result:any = await this.db.executeStoredProcedure(
                'SP_CREAR_PERMISOS',
                {
                    PERMISOS: { type: sql.VarChar, value: permits.permisos },
                    ID_USUARIO: { type: sql.Int, value: permits.exec_usuario}
                },
                {
                    STATUS_CODE: sql.Int,
                    STATUS_DESC: sql.VarChar(500)
                }
            );

        
        return {
            status_code: result.output.STATUS_CODE,
            status_desc: result.output.STATUS_DESC
        };
            
        } catch (error:any) {
                return {
                    status_code: error.code || 500,
                    status_desc: error.message
                };
        };
    };

   async createRol(rol:IRol){
    try {
        const result:any = await this.db.executeStoredProcedure(
            'SP_CREAR_ROL',
            {
                NOMBRE_ROL: { type: sql.VarChar, value: rol.nombre_rol },
                DESCRIPCION: { type: sql.VarChar, value: rol.descripcion },
                ID_USUARIO: { type: sql.Int, value: rol.exec_usuario}
            },
            {
                CODIGO: sql.Int,
                STATUS_CODE: sql.Int,
                STATUS_DESC: sql.VarChar(500)
            }
        );


        return {
            status_code: result.output.STATUS_CODE,
            status_desc: result.output.STATUS_DESC,
            id_rol: result.output.CODIGO
        };

    } catch (error:any) {
            return {
                    status_code: error.code || 500,
                    status_desc: error.message
                    };
        };
    };

    async updateStatusRol(rol:IUpRol){
    try {
        const result:any = await this.db.executeStoredProcedure(
            'SP_ESTADO_ROL',
            {
                ID_ROL: { type: sql.Int, value: rol.id_rol },
                ESTADO: { type: sql.Int, value: rol.estado },
                ID_USUARIO: { type: sql.Int, value: rol.exec_usuario }
            },
            {
                STATUS_CODE: sql.Int,
                STATUS_DESC: sql.VarChar(500)
            }
        );


        return {
            status_code: result.output.STATUS_CODE,
            status_desc: result.output.STATUS_DESC
        };

        } catch (error:any) {
            return {
                    status_code: error.code || 500,
                    status_desc: error.message
            };
        };
    };

async getRoles(filters:IRolesSearchFilters){
    try {
        const result:any = await this.db.executeStoredProcedure(
            'SP_GET_ROLES',
            {
                ORDERCOLUMN: { type: sql.VarChar, value: filters.ordercolumn },
                ORDERDIRECTION: { type: sql.VarChar, value: filters.orderdirection },
                PAGENUMBER: { type: sql.Int, value: filters.pagenumber },
                PAGESIZE: { type: sql.Int, value: filters.pagesize },
                ID_ROL: { type: sql.Int, value: filters.id_rol },
                NOMBRE_ROL: { type: sql.VarChar, value: filters.nombre_rol },
                DESCRIPCION: { type: sql.VarChar, value: filters.descripcion },
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

        const lista = result.recordsets[0];
        return {
            status_code: result.output.STATUS_CODE,
            status_desc: result.output.STATUS_DESC,
            totalRegistros: result.output.TOTALREGISTROS,
            lista
        };

    } catch (error:any) {
        return {
            status_code: error.code || 500,
            status_desc: error.message
        };
    };
};

 async getPermisosRol(idRol:number){
    try {
        const result:any = await this.db.executeStoredProcedure(
            'SP_GET_PERMISOS_ROL',
            {
                id_rol: { type: sql.Int, value: idRol }
            },
            {
                status_code: sql.Int,
                status_desc: sql.VarChar(500)
            }
        );

        const lista = result.recordset;
        return {
            status_code: result.output.status_code,
            status_desc: result.output.status_desc,
            lista
        };

        } catch (error:any) {
            return {
                user: null,
                status_code: error.code || 500,
                status_desc: error.message
            };
        };
    };

async getUsersRestricted(filters:IRestrictionSearchFilters){
     try {

        const result:any = await this.db.executeStoredProcedure(
            'PR_GET_USUARIOS_RESTRINGIDOS',
            {
                ORDERCOLUMN: { type: sql.VarChar, value: filters.ordercolumn },
                ORDERDIRECTION: { type: sql.VarChar, value: filters.orderdirection },
                PAGENUMBER: { type: sql.Int, value: filters.pagenumber },
                PAGESIZE: { type: sql.Int, value: filters.pagesize },
                IDENTIFICACION: { type: sql.VarChar, value: filters.identificacion },
                NOMBRE: { type: sql.VarChar, value: filters.nombre },
                CODIGO: { type: sql.Int, value: filters.codigo },
                STATUS: { type: sql.Int, value: filters.status }
            },
            {
                TOTALREGISTROS: sql.Int,
                STATUS_CODE: sql.Int,
                STATUS_DESC: sql.VarChar(500)
            }
        );

        const users = result.recordset;
        return {
            status_code: result.output.STATUS_CODE,
            status_desc: result.output.STATUS_DESC,
            totalRegistros: result.output.TOTALREGISTROS,
            users
        };

    } catch (error:any) {
        return {
            status_code: error.code,
            status_desc: error.message,
        };

    }
};

//RESTRICCIONES

async createRestriction(restriction:IRestriction){
    try {
        const result:any = await this.db.executeStoredProcedure(
            'SP_CREAR_RESTRICCION_USUARIO',
            {
                ID_USUARIO: { type: sql.Int, value: restriction.id_usuario },
                CODIGO: { type: sql.Int, value: restriction.codigo },
                ID_USUARIO_EJECUTO: { type: sql.Int, value: restriction.exec_usuario}
            },
            {
                STATUS_CODE: sql.Int,
                STATUS_DESC: sql.VarChar(500)
            }
        );


        return {
            status_code: result.output.STATUS_CODE,
            status_desc: result.output.STATUS_DESC
        };

    } catch (error:any) {
        return {
            status_code: error.code || 500,
            status_desc: error.message
        };
    };
};

async deleteRestriction (restriction:IRestriction){
    try {
        const result:any = await this.db.executeStoredProcedure(
            'SP_DELETE_RESTRICCION_USUARIO',
            {
                ID_USUARIO: { type: sql.Int, value: restriction.id_usuario },
                CODIGO: { type: sql.Int, value: restriction.codigo },
                ID_USUARIO_EJECUTO: { type: sql.Int, value: restriction.exec_usuario}
            },
            {
                STATUS_CODE: sql.Int,
                STATUS_DESC: sql.VarChar(500)
            }
        );


        return {
            status_code: result.output.STATUS_CODE,
            status_desc: result.output.STATUS_DESC
        };

    } catch (error:any) {
        return {
            status_code: error.code || 500,
            status_desc: error.message
        };
    };
};

//MENUS
async getListaMenus(){
        try {
            const result:any = await this.db.executeStoredProcedure(
                'SP_GET_LISTA_MENUS',
                {},
                {
                    STATUS_CODE: sql.Int,
                    STATUS_DESC: sql.VarChar(500)
                }
            );

            const lista = result.recordset;
                return {
                    status_code: result.output.STATUS_CODE,
                    status_desc: result.output.STATUS_DESC,
                    lista
                };

            } catch (error:any) {
                return {
                        status_code: error.code || 500,
                        status_desc: error.message
                };
            };
    };
}

export default RolesOperations;