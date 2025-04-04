//modelo de dominio donde se hacer validaciones basicas
export interface UserD {
    consecutivo?: number;
    fecha_creacion: string;
    fecha_actualizacion:string;
    numeroCedula: number;
    alias: string;
    nombres: string;
    apellidos: string;
    fijo: string;
    celular: string;
    correo: string;
    contraseña: string;
    rol: number;
    estado: number;
}


