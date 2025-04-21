import { BaseDtoImpl } from "../../../core/dtos/base.dto";
import { RolesE } from "../entities/model.roles.entity";
import { RolesD } from "../models/model.roles.domain";



export class RolesDto extends BaseDtoImpl<RolesE, RolesD> {

    fromDomainToDataSingle(roles: RolesD): RolesE {
        return {
                F_CREACION: roles.f_create,
                F_MODIFICACION: roles.f_update,
                ID_ROL: roles.id_role,
                NOMBRE_ROL: roles.rol_name,
                ESTADO: roles.status,
                USUARIO_EXE: roles.user_exec
            };
    }

    fromDataToDomainSingle(data: RolesE): RolesD {
        return {
                f_create: data.F_CREACION,
                f_update: data.F_MODIFICACION,
                id_role: data.ID_ROL,
                rol_name: data.NOMBRE_ROL,
                status: data.ESTADO,
                user_exec: data.USUARIO_EXE
            };
    };
}