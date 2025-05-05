
import { PageResult } from "../interfaces/page-results";
import { BasePort } from "../port/base.port";
import { ResultI } from '../adapter/operarations.model';
import { IResponseDto } from "../interfaces/response-dto";

export abstract class BaseApplication<Model, Port extends BasePort<Model>, Response, DtoResponse extends IResponseDto<Model, Response>>{
    constructor(
        private readonly port: Port,
        private readonly dtoResponse: DtoResponse

    ) { }
    
    async create(model: Model): Promise<ResultI> {
        
        const result: ResultI = await this.port.create(model);
        const modelResponse = result.DATA;
        result.DATA = this.dtoResponse.fromDomainToResponse(modelResponse) as Response;
        return result;
        };
    
    async update(model: Model): Promise<ResultI>{
            
        const result: ResultI = await this.port.update(model);
        const modelResponse = result.DATA;
        result.DATA = this.dtoResponse.fromDomainToResponse(modelResponse) as Response;
        return result;
    }
    
    

    async inactivate(id:number, status:number, user_exe: number):Promise<ResultI> {
        
        const result: ResultI = await this.port.inactivate(id,status,user_exe);
        return result;
    }
    
        async get(id:string):Promise<Model | null> {
            return this.port.get(id);
        }
    
        async list(estado: number): Promise<Model[]>{
            
            const result:any = this.port.get(estado);
            
            if (result) {
                return result
            }
    
            return []
        }
    
    async getByPage(page:any, pageSize:any, id:any, status:any, filtros?:any): Promise<PageResult<Model>>{
            return this.port.getByPage(page, pageSize, id ,status, filtros);
     };
}