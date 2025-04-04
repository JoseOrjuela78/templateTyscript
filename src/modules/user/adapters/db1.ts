
import { Database } from "../../../bootstrap/database.bootstrap";
import { envs } from "../../../config/environment-vars";
import { LoggerService } from '../../../common/logger';
const logger = new LoggerService();
const dbConfig = envs.db;

export class Db1 {

    async executeQuerydb1(sqlquery: string, params?: {}) {

        try {
            //se crea una instancia
            const db = Database.getInstance(dbConfig);
            //se obtiene coneccion
            await db.connect();
            const result = await db.query(sqlquery, params);
            //cierra conexxion
            await db.close();
            return result;
    
        } catch (error) {
            logger.error(`${new Date().toString()} Error executeQuery connetion ${error}`);
        };


    }
};