import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { UserE } from '../entities/model.user.entity';
import { UserD } from "../models/model.user.domain";

export class UserDto extends BaseDtoImpl<UserE, UserD> {

    fromDomainToDataSingle(user: UserD): UserE {
        return {
            email: user.correo,
            estado: user.estado,
            fecha_init: user.fecha_creacion,
            fecha_update: user.fecha_actualizacion,
            nombre: user.nombres,
            identificacion: user.numeroCedula,
            id_usuario: user.consecutivo,
            apellido: user.apellidos,
            pass: user.contraseña,
            telefono: user.fijo,
            rol: user.rol,
            username: user.alias,
            celular: user.celular
        };
    }

    fromDataToDomainSingle(data: UserE): UserD {
        return {
            consecutivo: data.id_usuario,
            fecha_creacion: data.fecha_init,
            fecha_actualizacion: data.fecha_update,
            numeroCedula: data.identificacion,
            alias: data.username,
            nombres: data.nombre,
            apellidos: data.apellido,
            fijo: data.telefono,
            celular: data.celular,
            correo: data.email,
            contraseña: data.pass,
            rol: data.rol,
            estado: data.estado
        };
    }
}
