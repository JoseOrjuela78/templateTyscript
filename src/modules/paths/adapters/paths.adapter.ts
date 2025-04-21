import { BaseAdapter } from "../../../core/adapter/base.adapter";
import { Db1 } from "../../../core/adapter/db1";
import { PathsDto } from "../dtos/paths.dto";
import { PathsE } from "../entities/model.paths.entity";
import { PathsD } from "../models/model.paths.domain";
import { PathsPort } from '../ports/paths.port';
import { PathsOperations } from "./paths.operations";
const db = new Db1();




export class PathsAdapter extends BaseAdapter<PathsE, PathsD> implements PathsPort{
    constructor() {
        super(new PathsOperations(db), new PathsDto());
    }

}