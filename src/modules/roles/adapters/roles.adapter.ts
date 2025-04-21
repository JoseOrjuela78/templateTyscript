import { BaseAdapter } from "../../../core/adapter/base.adapter";
import { Db1 } from "../../../core/adapter/db1";
import { RolesDto } from "../dtos/roles.dto";
import { RolesE } from "../entities/model.roles.entity";
import { RolesD } from "../models/model.roles.domain";
import { RolesPort } from "../ports/roles.port";
import { RolesOperations } from "./roles.operations";
const db = new Db1();



export class RolesAdapter extends BaseAdapter<RolesE, RolesD> implements RolesPort{
    constructor() {
        super(new RolesOperations(db), new RolesDto());
    }

}