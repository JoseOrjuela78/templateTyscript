export interface IUserDb {
    ID_USUARIO:number | null;
    TIPO_PERSONA: number;
    TIPO_IDENTIFICACION: number;
    IDENTIFICACION: string;
    RAZON_SOCIAL: string;
    NOMBRE1: string;
    NOMBRE2: string;
    APELLIDO1: string;
    APELLIDO2: string;
    EMAIL: string;
    GENERO: number;
    CIUDAD: number;	
    TELEFONO: string;
    ID_ROL: number;
    PASS: string;
    EXEC_USUARIO: number;
};