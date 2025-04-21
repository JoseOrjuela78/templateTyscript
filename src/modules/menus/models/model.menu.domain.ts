//modelo de dominio donde se hacer validaciones basicas
export interface MenuD {
f_create?: Date;
f_update?:Date
id_menu?: number;
menu_title: string; 
type: string; 
icon: string; 
path: string; 
depend: number;
JsonInput?:string; 
status?: number;
user_exec: number;
}


