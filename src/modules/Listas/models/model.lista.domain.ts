//modelo de dominio donde se hacer validaciones basicas
export interface ListaD {
    f_create?: Date;
    f_update?:Date
    id_lista?: number;
    nombre_lista: string; 
    descripcion_lista: string; 
    status?: number;
    user_exec: number;
}