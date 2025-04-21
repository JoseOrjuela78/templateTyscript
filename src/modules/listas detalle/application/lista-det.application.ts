import { BaseApplication } from "../../../core/application/base.application";
import { ListaDetalleResponse, ListaDetalleResponseDto } from "../dtos/lista-det-response.dto";
import { ListaDetalleD } from "../models/model.lista-det.domain";
import { ListaDetallePort } from "../ports/lista-det.port";




export class ListaDetalleAplication extends BaseApplication<
    ListaDetalleD,
    ListaDetallePort,
    ListaDetalleResponse,
    ListaDetalleResponseDto
    >{

    //heredda para extender la clase
    constructor(
        private readonly listadetallePort: ListaDetallePort

    ) {
        super(listadetallePort, new ListaDetalleResponseDto());
     }

}