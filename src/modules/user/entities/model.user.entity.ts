export interface UserE {
    F_CREACION?: Date;
    F_MODIFICACION?: Date
    ID_USUARIO?: number;
    ID_PERSONA?: number; 
    ID_TIPO_DOC: number;
    TIPO_DOC?: string;
    IDENTIFICACION: string;
    NOMBRE_COMPLETO: string;
    CIIU_ACTIVIDAD: string;
    DANE_MUNICIPIO: string;
    F_NACIMIENTO: Date
    EMAIL: string;
    PEP: number;
    ID_ROL: number;
    NOMBRE_ROL?: string;
    PASS?: string;
    ESTADO?: number;
    USUARIO_EXE: number;
    REFRESHTOKEN?: string;
}