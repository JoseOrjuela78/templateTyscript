import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { UserE } from '../entities/model.user.entity';
import { UserD } from "../models/model.user.domain";

export class UserDto extends BaseDtoImpl<UserE, UserD> {

    fromDomainToDataSingle(user: UserD): UserE {
        return {
               F_CREACION: user.f_create, 
               F_MODIFICACION: user.f_update,
               ID_USUARIO: user.user_id,
               ID_PERSONA: user.person_id,
               ID_TIPO_DOC: user.type_doc_id,
               TIPO_DOC: user.type_doc,
               IDENTIFICACION: user.id,
               NOMBRE_COMPLETO: user.name,
               CIIU_ACTIVIDAD: user.e_activity,
               DANE_MUNICIPIO: user.city_id,
               F_NACIMIENTO: user.birth_date,
               EMAIL:user.email,
               PEP: user.pep,
               ID_ROL: user.rol_id,
               NOMBRE_ROL: user.rol_name,
               PASS: user.password,
               ESTADO: user.status,
               USUARIO_EXE: user.user_exec,
               REFRESHTOKEN: user.refreshToken
               
        };
    }

    fromDataToDomainSingle(data: UserE): UserD {
        return {
            f_create: data.F_CREACION,
            f_update: data.F_MODIFICACION,
            user_id: data.ID_USUARIO,
            person_id: data.ID_PERSONA,
            type_doc_id: data.ID_TIPO_DOC,
            type_doc: data.TIPO_DOC,
            id: data.IDENTIFICACION,
            name: data.NOMBRE_COMPLETO,
            e_activity: data.CIIU_ACTIVIDAD,
            city_id: data.DANE_MUNICIPIO,
            birth_date: data.F_NACIMIENTO,
            email: data.EMAIL,
            pep: data.PEP,
            rol_id: data.ID_ROL,
            rol_name: data.NOMBRE_ROL,
            password: data.PASS,
            status: data.ESTADO,
            user_exec: data.USUARIO_EXE,
            refreshToken: data.REFRESHTOKEN
        };
    }
}
