import { BaseAdapter } from "../../../core/adapter/base.adapter";
import { ListaE } from "../entities/model.lista.entity";
import { ListaD } from "../models/model.lista.domain";
import { ListaPort } from "../ports/lista.port";
import { ListasOperations } from "./listas.operations";
import { Db1 } from "../../../core/adapter/db1";
import { ListaDto } from "../dtos/lista.dto";
const db = new Db1();



export class ListaAdapter extends BaseAdapter<ListaE, ListaD> implements ListaPort{
    constructor() {
        super(new ListasOperations(db), new ListaDto());
    }

}