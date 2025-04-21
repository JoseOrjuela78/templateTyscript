import { Expose, plainToInstance } from "class-transformer";
import { ListaDetalleD } from "../models/model.lista-det.domain";
import { IResponseDto } from "../../user/dtos/user-response.dto";

export class ListaDetalleResponse{

    @Expose()
    f_create!: Date;
    @Expose()
    f_update!: Date
    @Expose()
    id_list_det!: number;
    @Expose()
    id_list!: number;
    @Expose()
    value!: string; 
    @Expose()
    params!: string; 
    @Expose()
    status!: number;
    @Expose()
    user_exec!: number;

};

export class ListaDetalleResponseDto implements IResponseDto<ListaDetalleD, ListaDetalleResponse> {
    
    
    fromDomainToResponse(model: ListaDetalleD | ListaDetalleD[]): ListaDetalleResponse | ListaDetalleResponse[] {
        if (Array.isArray(model)) {
            return model.map(user => this.fromDomainToResponse(user)) as ListaDetalleResponse[];
        }

        return plainToInstance(ListaDetalleResponse, model,
            {
                excludeExtraneousValues: true
             });
    }
}