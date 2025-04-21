import { BaseAdapter } from "../../../core/adapter/base.adapter";
import { Db1 } from "../../../core/adapter/db1";
import { ListaDetalleDto } from "../dtos/lista-det.dto";
import { ListaDetalleE } from "../entities/model.lista-det.entity";
import { ListaDetalleD } from "../models/model.lista-det.domain";
import { ListaDetallePort } from "../ports/lista-det.port";
import { ListasDetalleOperations } from "./lista-det.operations";
const db = new Db1();


export class ListaDetalleAdapter extends BaseAdapter<ListaDetalleE, ListaDetalleD> implements ListaDetallePort{
    constructor() {
        super(new ListasDetalleOperations(db), new ListaDetalleDto());
    }

}