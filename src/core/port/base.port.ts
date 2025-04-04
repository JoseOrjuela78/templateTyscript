import { PageResult } from "../interfaces/page-results";

export type BasePort<Model> = {
        create(model:Model): Promise<T>;
        update(model:Model): Promise<T>;
        delete(id:any): Promise<void>;
        get(id: any): Promise<Model | null>;
        list(estado:number): Promise<Model[]>
        getByPage(page: number, pageSize: number, estado: number): Promise<PageResult<Model>>;
    
}