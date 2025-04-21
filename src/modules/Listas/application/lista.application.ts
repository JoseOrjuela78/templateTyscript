import { BaseApplication } from "../../../core/application/base.application";
import { ListaResponse, ListaResponseDto } from "../dtos/lista-response.dto";
import { ListaD } from "../models/model.lista.domain";
import { ListaPort } from "../ports/lista.port";



export class ListaAplication extends BaseApplication<
    ListaD,
    ListaPort,
    ListaResponse,
    ListaResponseDto
    >{

    //heredda para extender la clase
    constructor(
        private readonly listaPort: ListaPort

    ) {
        super(listaPort, new ListaResponseDto());
     }

}