import { BaseDtoImpl } from "../../../core/dtos/base.dto";
import { ListaE } from "../entities/model.lista.entity";
import { ListaD } from "../models/model.lista.domain";


export class ListaDto extends BaseDtoImpl<ListaE, ListaD> {

    fromDomainToDataSingle(lista: ListaD): ListaE {
        return {
                F_CREACION: lista.f_create,
                F_MODIFICACION: lista.f_update,
                ID_LISTA: lista.id_lista,
                NOMBRE_LISTA: lista.nombre_lista,
                DESCRIPCION_LISTA: lista.descripcion_lista,
                ESTADO: lista.status,
                USUARIO_EXE	: lista.user_exec
               };
    }

    fromDataToDomainSingle(data: ListaE): ListaD {
        return {
                f_create: data.F_CREACION,
                f_update: data.F_MODIFICACION,
                id_lista: data.ID_LISTA,
            nombre_lista: data.NOMBRE_LISTA,
       descripcion_lista: data.DESCRIPCION_LISTA,
                  status: data.ESTADO,
               user_exec: data.USUARIO_EXE
             }
    };
}
