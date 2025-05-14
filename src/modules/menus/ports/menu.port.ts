
import { PageResult } from '../../../core/interfaces/page-results';
import { BasePort } from '../../../core/port/base.port';
import { MenuD } from '../models/model.menu.domain';

export type MenuPort = BasePort<MenuD> & {
    getActivateMenus(): Promise<PageResult<MenuD>>
}