import { IResponseDto } from "../../modules/user/dtos/user-response.dto";
import { PageResult } from "../interfaces/page-results";
import { BasePort } from "../port/base.port";

export abstract class BaseApplication<Model, Port extends BasePort<Model>, Response, DtoResponse extends IResponseDto<Model, Response>>{
    constructor(
        private readonly port: Port,
        private readonly dtoResponse: DtoResponse

    ) { }
    
    async create(model: Model): Promise<Response> {
        const modelResponse = await this.port.create(model);
        return this.dtoResponse.fromDomainToResponse(modelResponse) as Response;
        };
    
        async update(model: Model):Promise<Model>{
            return this.port.update(model);
        }
    
        async delete(id:string):Promise<void> {
            return this.port.delete(id);
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
    
        async getByPage(page: number, pageSize: number, estado: number): Promise<PageResult<Model>>{
            return this.port.getByPage(page,pageSize,estado);
        };
}