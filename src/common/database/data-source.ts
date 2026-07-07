import e from "../config/enviroment-vars";
import { IDatasource } from "../models/IDataSource";
import { Pool } from "pg"
import Logger from "../logger";


class AppDataSource {

  private pool!:Pool;
  private log:Logger;

  constructor(
    private readonly config:IDatasource
  ){
    this.createPool(config);
    this.log = new Logger();
  }

  private createPool(config:IDatasource){
    this.pool = new Pool(config)
  };

  /**
  "SELECT * FROM get_user_by_id($1)",
  [1]
 */
  async execQuery(query: string, params: any[] = []){
     try {
      const res = await this.pool.query(query,params);
      return res.rows;
    } catch (error) {
        this.log.error(`${error}`);
      throw error;
    };
  }
  
  async close() {
    await this.pool.end();
      this.log.info("🔒 Pool cerrado");
  }

}

const config:IDatasource ={
    host: e.envs.HOST_DB,
    port: e.envs.PORT_DB,
    user: e.envs.USER_DB,
    password: e.envs.PASS_DB,
    database: e.envs.NAME_DB,
    ssl:{
      rejectUnauthorized: Number(e.envs.REJECTUNAUTHORIZED) === 1
    }
};
const database = new AppDataSource(config);

export default database;
