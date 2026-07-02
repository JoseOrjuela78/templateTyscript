export interface IDatasource{
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    ssl: {
        rejectUnauthorized: boolean
    }
};