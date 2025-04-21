import { MenuPort } from '../ports/menu.port';
import { MenuDto } from '../dtos/menu.dto';
import { BaseAdapter } from '../../../core/adapter/base.adapter';
import { MenuOperations } from './menus.operations';
import { Db1 } from '../../../core/adapter/db1';
import { MenuE } from '../entities/model.menu.entity';
import { MenuD } from '../models/model.menu.domain';
const db = new Db1();

export class MenuAdapter extends BaseAdapter<MenuE, MenuD> implements MenuPort{
    constructor() {
        super(new MenuOperations(db), new MenuDto());
    }

}



    

