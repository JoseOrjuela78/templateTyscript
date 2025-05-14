import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { MenuE } from '../entities/model.menu.entity';
import { MenuD } from "../models/model.menu.domain";

export class MenuDto extends BaseDtoImpl<MenuE, MenuD> {

    fromDomainToDataSingle(menu: MenuD): MenuE {
        return {
                F_CREACION: menu.f_create,
                F_MODIFICACION: menu.f_update,
                ID_MENU: menu.id_menu,
                MENU_TITULO: menu.menu_title, 
                TIPO: menu.type,
                ICONO: menu.icon,
                URL: menu.path,
                DEPENDE: menu.depend,
                JsonInput: menu.JsonInput,
                ESTADO: menu.status,
                CHILDREN: menu.children,
                USUARIO_EXE	: menu.user_exec
               };
    }

    fromDataToDomainSingle(data: MenuE): MenuD {
        return {
                f_create: data.F_CREACION,
                f_update:data.F_MODIFICACION,
                id_menu: data.ID_MENU,
                menu_title: data.MENU_TITULO,
                type: data.TIPO,
                icon: data.ICONO,
                path: data.URL,
                depend: data.DEPENDE,
                JsonInput: data.JsonInput,
                status: data.ESTADO,
                children: data.CHILDREN,
                user_exec: data.USUARIO_EXE
                };
    }
}
