import msDatabase from "../common/database/data-mssql";
import sql from 'mssql';

class FiltersOperations {

   constructor(private readonly db: typeof msDatabase){}

   async getListaDetalle (codigoLista:number){
    try {
        const result:any = await this.db.executeStoredProcedure(
            'SP_GET_LISTA_DETALLE',
            {
                CODIGO_LISTA: { type: sql.Int, value: codigoLista }
            },
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

  async getCitiesList(codigoPais:string){
    try {
        const result:any = await this.db.executeStoredProcedure(
            'SP_GET_LISTA_CIUDADES',
            {
                codigo_pais: { type: sql.VarChar, value: codigoPais }
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
                    status_code: error.code || 500,
                    status_desc: error.message
            };
        };
    };
}

export default FiltersOperations;