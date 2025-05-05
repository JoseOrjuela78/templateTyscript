import { Expose, plainToInstance } from "class-transformer";
import { ListaD } from "../models/model.lista.domain";
import { IResponseDto } from "../../../core/interfaces/response-dto";


export class ListaResponse {

    @Expose()
    f_create!: Date;
    @Expose()
    f_update!: Date
    @Expose()
    id_lista?: number;
    @Expose()
    nombre_lista!: string; 
    @Expose()
    descripcion_lista!: string; 
    @Expose()
    status!: number;
    @Expose()
    user_exec!: number;

};

export class ListaResponseDto implements IResponseDto<ListaD, ListaResponse> {
    
    
    fromDomainToResponse(model: ListaD | ListaD[]): ListaResponse | ListaResponse[] {
        if (Array.isArray(model)) {
            return model.map(user => this.fromDomainToResponse(user)) as ListaResponse[];
        }

        return plainToInstance(ListaResponse, model,
            {
                excludeExtraneousValues: true
             });
    }
}