import { PageResult } from "../../../core/interfaces/page-results";
import { AuthD } from "../models/auth";

export type Tokens = {
    fullName: string;
    accessToken: string;
    refreshToken: string;
    menus:[]
};

export type AuthPort = {
    login(auth: AuthD): Promise<Tokens | null>;
    getPaths(id_usuario: number): Promise<PageResult<any>>;
    refreshToken(refreshToken:string):Promise<Tokens| null>;
};