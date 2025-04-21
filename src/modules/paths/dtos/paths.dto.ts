import { BaseDtoImpl } from "../../../core/dtos/base.dto";
import { PathsE } from "../entities/model.paths.entity";
import { PathsD } from "../models/model.paths.domain";



export class PathsDto extends BaseDtoImpl<PathsE, PathsD> {

    fromDomainToDataSingle(path: PathsD): PathsE {
        return {
                    F_CREACION: path.f_create,
                    F_MODIFICACION: path.f_update,
                    ID_PATH: path.id_path,
                    ID_MENU: path.id_menu,
                    PATH: path.path,
                    ID_ACCION: path.id_action,
                    ESTADO: path.status,
                    USUARIO_EXE: path.user_exec
               };
    }

    fromDataToDomainSingle(data: PathsE): PathsD {
        return {
                f_create: data.F_CREACION,
                f_update: data.F_MODIFICACION,
                id_path: data.ID_PATH,
                id_menu: data.ID_MENU,
                path: data.PATH,
                id_action: data.ID_ACCION,
                status: data.ESTADO,
                user_exec: data.USUARIO_EXE
             }
    };
}