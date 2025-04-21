import { PageResult } from "../interfaces/page-results";
import { ResultI } from './operarations.model';

export abstract class BaseAdapter<Entity, Model>{
    protected operations: any
    protected dtoAdapter: any;
    
        constructor(operations: any, dtoAdapter: any) {
            this.operations = operations;
            this.dtoAdapter = dtoAdapter;
    }
    
    async create(model: Model): Promise<ResultI> {
       //convierte domain en entidad
       const userEntity = this.dtoAdapter.fromDomainToData(model) as Entity;
       //envia entidad a operacion y retorna un ResultI
        const result: ResultI = await this.operations.create(userEntity);
    
       //convierte entidad a domain
       result.DATA = this.dtoAdapter.fromDataToDomain(result.DATA);
       return result;
    };

    async update(model: Model): Promise<ResultI> {
        //convierte domain en entidad
        const userEntity = this.dtoAdapter.fromDomainToData(model) as Entity;
        //envia entidad a operacion y retorna un ResultI
        const result: ResultI = await this.operations.update(userEntity);
        //convierte entidad a domain
        result.DATA = this.dtoAdapter.fromDataToDomain(result.DATA);
        return result;
    };

    async inactivate(id:number, status:number, user_exe: number): Promise<ResultI> {
        
        const result: ResultI = await this.operations.inactivate(id, status, user_exe);
        return result;
     }

    async get(userId: any): Promise<Model | null> {
        
        const userEntityFound : any = await this.operations.getId(userId);
        if (userEntityFound) {
            const userDomain = this.dtoAdapter.fromDataToDomain(userEntityFound) as Model;

            return userDomain;
        };

        return null;
       
    };

    async list(estado: number): Promise<Model[]> {
        // get base de datos
        
        const rows:any = await this.operations.get(estado);
         
        if (rows.length > 0) {
            return this.dtoAdapter.fromDataToDomain(rows) as Model[];
    
        };

        return [];

    }
  
    async getByPage(page: number, pageSize: number, id:any,status:any, filtros?:any): Promise<PageResult<Model>>{
        
        const result: ResultI = await this.operations.getPag(page, pageSize, id, status, filtros);
        
        if (result.TOTAL_ROWS && result.TOTAL_ROWS > 0) {

            return {
                STATUS_CODE: result.STATUS_CODE,
                STATUS_DESC: result.STATUS_DESC,
                data: this.dtoAdapter.fromDataToDomain(result.DATA) as Model[],
                page,
                pageSize,
                total: result.TOTAL_ROWS
            }
            
        }

        return {
            STATUS_CODE: result.STATUS_CODE,
            STATUS_DESC: result.STATUS_DESC,
            data: [],
            page,
            pageSize,
            total: 0
        };
     
    };

}