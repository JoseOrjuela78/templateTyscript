import sql from 'mssql';
import Logger from '../logger';
import AppError from '../appError';
import e from '../config/enviroment-vars';

class DataMSSQL {

    private pool: sql.ConnectionPool | null = null;
    private log:Logger;

    constructor(private readonly config: sql.config){
        this.log = new Logger();
    }

    async getPool(): Promise<sql.ConnectionPool> {
        this.pool = await new sql.ConnectionPool(this.config).connect();
        return this.pool;
    };

    async executeStoredProcedure (spName:string, inputParams = {}, outputParams = {}){
        let pool: sql.ConnectionPool | null = null;
        try {
            pool = await this.getPool();
            const request = pool.request();

            // Inputs
            if (typeof inputParams === 'object' && inputParams != null) {
                for (const [name, { type, value }] of Object.entries(inputParams)) {
                    request.input(name, type,value);
                };
            } else {
                throw new AppError(JSON.stringify('invalid inputParams'), 422);
            };
 
            // Outputs
            if (typeof outputParams === 'object' && outputParams !== null) {
                for (const [name, type] of Object.entries(outputParams)) {
                    request.output(name, type);
                };
            } else {
                throw new AppError(JSON.stringify('invalid outputParams'), 422);
            };

            const result = await request.execute(spName);
            return result;
        } catch (error:any) {
           this.log.error(`Error executeStoredProcedure ${spName} - ${error.message ?? 'DataMSSQL Error'}`);
        } finally {
           if (pool) { 
            await pool.close();  
            } 
        };

    };
};
const op = JSON.parse(e.envs.MS_OPTIONS);

const sqlConfig:sql.config = {
    user: e.envs.MS_USER,
    password: e.envs.MS_PASSWORD,
    database: e.envs.MS_DB,
    port: e.envs.MS_PORT,
    server: e.envs.MS_HOST,
    pool: {
        max: op.max,
        min: op.min,
        idleTimeoutMillis: op.idleTimeoutMillis
    },
    options: {
        encrypt: op.encrypt, 
        trustServerCertificate: op.trustServerCertificate, 
        enableArithAbort: op.enableArithAbort
    }
};

const msDatabase = new DataMSSQL(sqlConfig);

export default msDatabase;