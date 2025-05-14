import { MenuPort } from '../ports/menu.port';
import { MenuDto } from '../dtos/menu.dto';
import { BaseAdapter } from '../../../core/adapter/base.adapter';
import { MenuOperations } from './menus.operations';
import { Db1 } from '../../../core/adapter/db1';
import { MenuE } from '../entities/model.menu.entity';
import { MenuD } from '../models/model.menu.domain';
import { PageResult } from '../../../core/interfaces/page-results';
import { ResultI } from '../../../core/adapter/operarations.model';
const db = new Db1();

export class MenuAdapter extends BaseAdapter<MenuE, MenuD> implements MenuPort{
    constructor() {
        super(new MenuOperations(db), new MenuDto());
    }

    async getActivateMenus(): Promise<PageResult<MenuD>> {
        const result: ResultI = await this.operations.getActivateMenus();
    
        if (result.TOTAL_ROWS && result.TOTAL_ROWS > 0) {
            result.DATA = this.dtoAdapter
                .fromDataToDomain(result.DATA)
                .map((menu: any) => ({
                    id_menu: menu.id_menu,
                    menu_title: menu.menu_title,
                    type: menu.type,
                    icon: menu.icon,
                    path: menu.path,
                    children: Array.isArray(menu.children) && menu.children.length > 0
                        ? this.dtoAdapter.fromDataToDomain(menu.children).map((child: any) => ({
                            menu_title: child.menu_title,
                            type: child.type,
                            icon: child.icon,
                            path: child.path
                        }))
                        : []
                }));
    
            return {
                STATUS_CODE: result.STATUS_CODE,
                STATUS_DESC: result.STATUS_DESC,
                data: result.DATA,
                page: 0,
                pageSize: 0,
                total: result.TOTAL_ROWS
            };
        }
    
        return {
            STATUS_CODE: result.STATUS_CODE,
            STATUS_DESC: result.STATUS_DESC,
            data: [],
            page: 0,
            pageSize: 0,
            total: 0
        };
    }

}



    

