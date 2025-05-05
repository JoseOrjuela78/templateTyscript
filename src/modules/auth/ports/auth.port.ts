import { PageResult } from "../../../core/interfaces/page-results";
import { AuthD } from "../models/auth";

export type Tokens = {
    accessToken: string;
    refreshToken: string;
};

export type AuthPort = {
    login(auth: AuthD): Promise<Tokens | null>;
    getPaths(id_usuario: number): Promise<PageResult<any>>;
};