//modelo de dominio donde se hacer validaciones basicas
export interface UserD {
    f_create?: Date;
    f_update?: Date
    user_id?: number;
    person_id?: number;
    type_doc_id: number;
    type_doc?: string;
    id: string;
    name: string; 
    e_activity: string; 
    city_id: string;
    birth_date: Date
    email: string;
    pep: number;
    rol_id: number;
    rol_name?: string;
    password?: string;
    status?: number;
    user_exec: number;
    refreshToken?: string;
};


