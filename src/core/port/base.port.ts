import { PageResult } from "../interfaces/page-results";

export type BasePort<Model> = {
        create(model:Model): Promise<T>;
        update(model:Model): Promise<T>;
        inactivate(id:number, status:number, user_exe: number): Promise<T>;
        get(id: any): Promise<Model | null>;
        list(estado:number): Promise<Model[]>
        getByPage(page:any, pageSize:any, id:any, status:any, filtros?:[]): Promise<PageResult<Model>>;
    
}