import { PageResult } from "../interfaces/page-results";

export abstract class BaseAdapter<Entity, Model>{
    protected operations: any
    protected dtoAdapter: any;
    
        constructor(operations: any, dtoAdapter: any) {
            this.operations = operations;
            this.dtoAdapter = dtoAdapter;
    }
    
   async create(model: Model): Promise<Model> {
        const userEntity = this.dtoAdapter.fromDomainToData(model) as Entity;
       const result:any = await this.operations.createUser(userEntity);
       console.log({ code: result.result.recordsets[0][0].COD,
                     message: result.result.recordsets[1][0].MSG
                  });
        return model;
    };

    async update(model: Model): Promise<Model> {
        const userEntity = this.dtoAdapter.fromDomainToData(model)  as Entity;
        await this.operations.updateUser(userEntity);
        return model;
    };

    async delete(userId: any): Promise<void> {
        await this.operations.deleteUser(userId);
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
  
    async getByPage(page: number, pageSize: number, estado: number): Promise<PageResult<Model>>{
        let result: any;
        result = await this.operations.getPag(page, pageSize, estado);
        
        if (result.total_rows > 0) {

            return {
                data: this.dtoAdapter.fromDataToDomain(result.data) as Model[],
                page,
                pageSize,
                total: result.total_rows
            }
            
        }

        return {
            data: [],
            page,
            pageSize,
            total: 0
        };
     
    };

}