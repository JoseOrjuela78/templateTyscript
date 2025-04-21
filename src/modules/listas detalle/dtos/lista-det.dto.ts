import { BaseDtoImpl } from "../../../core/dtos/base.dto";
import { ListaDetalleE } from "../entities/model.lista-det.entity";
import { ListaDetalleD } from "../models/model.lista-det.domain";



export class ListaDetalleDto extends BaseDtoImpl<ListaDetalleE, ListaDetalleD> {

    fromDomainToDataSingle(listaDetalle: ListaDetalleD): ListaDetalleE {
        return {
                F_CREACION: listaDetalle.f_create,
                F_MODIFICACION: listaDetalle.f_update,
                ID_LISTA_DET: listaDetalle.id_list_det,
                ID_LISTA: listaDetalle.id_list,
                VALOR: listaDetalle.value,
                PARAMETROS: listaDetalle.params,
                ESTADO: listaDetalle.status,
                USUARIO_EXE	: listaDetalle.user_exec
               };
    }

    fromDataToDomainSingle(data: ListaDetalleE): ListaDetalleD {
        return {
                f_create: data.F_CREACION,
                f_update: data.F_MODIFICACION,
             id_list_det: data.ID_LISTA_DET,
                 id_list: data.ID_LISTA,
                   value: data.VALOR,
                  params: data.PARAMETROS,
                  status: data.ESTADO,
               user_exec: data.USUARIO_EXE
             }
    };
}