import { IUserDb } from "./IUserDb";
import { IUserDom } from "./IUserDom";

export class UserDto {
    static FromDomainToDb(data:IUserDom | IUserDom[]):IUserDb |IUserDb[]{

        if(Array.isArray(data)) {
            return data.map((item)=> this.FromDomainToDb(item)) as IUserDb[];
        };
        
        const userdb:IUserDb = {
                                TIPO_PERSONA: data.tipo_persona,
                                TIPO_IDENTIFICACION: data.tipo_identificacion,
                                IDENTIFICACION: data.identificacion,
                                RAZON_SOCIAL: data.razon_social,
                                NOMBRE1: data.nombre1,
                                NOMBRE2: data.nombre2,
                                APELLIDO1: data.apellido1,
                                APELLIDO2: data.apellido2,
                                EMAIL: data.email,
                                GENERO: data.genero,
                                CIUDAD: data.ciudad,
                                TELEFONO: data.telefono,
                                ID_ROL: data.id_rol,
                                PASS: data.pass,
                                ID_USUARIO: data.id_usuario
                                };

        return userdb;
    };

    static FromDbToDomain(data:IUserDb | IUserDb[]):IUserDom | IUserDom[]{

        if(Array.isArray(data)) {
            return data.map((item)=> this.FromDbToDomain(item)) as IUserDom[];
        };

        const userdom:IUserDom = {
                                tipo_persona: data.TIPO_PERSONA, 
                                tipo_identificacion: data.TIPO_IDENTIFICACION, 
                                identificacion: data.IDENTIFICACION, 
                                razon_social: data.RAZON_SOCIAL, 
                                nombre1: data.NOMBRE1, 
                                nombre2: data.NOMBRE2, 
                                apellido1: data.APELLIDO1, 
                                apellido2: data.APELLIDO2, 
                                email: data.EMAIL, 
                                genero: data.GENERO, 
                                ciudad: data.CIUDAD, 
                                telefono: data.TELEFONO, 
                                id_rol: data.ID_ROL, 
                                pass: data.PASS, 
                                id_usuario: data.ID_USUARIO 
                                };

        return userdom;
    };
}    

    