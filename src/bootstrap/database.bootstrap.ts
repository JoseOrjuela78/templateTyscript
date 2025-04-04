import { LoggerService } from '../common/logger';
const logger = new LoggerService();
import { ConnectionPool, config as SqlConfig, Request, IResult } from 'mssql';


export class Database {
  private static instance   : Database;
  private readonly pool     : ConnectionPool;
      
    private constructor(private readonly config: SqlConfig) {
    this.pool = new ConnectionPool(config);
  }

  // Método para obtener una instancia única (Singleton)
  public static getInstance(config: SqlConfig): Database {
      
    if (!Database.instance) {
        Database.instance = new Database(config);
    }
    return Database.instance;
    }

  // Método para conectar a la base de datos
  public async connect(): Promise<void> {
    try {
      if (!this.pool.connected) {
           await this.pool.connect();
           logger.info('Conexión establecida con SQL Server');
      }
    } catch (error) {
      logger.error(`Error al conectar con SQL Server: ${error}`);
      throw error;
    }
  }

  // Método para ejecutar una consulta
    public async query<T = any>(sql: string, params?: { [key: string]: { value: any; type: any; isOutput?: boolean }; }): Promise<{ result: IResult<T>; output: { [key: string]: any } }> {
      
    try {
          const request: Request = this.pool.request();
          if (params) {
             for (const key in params) {
                  const { value, type, isOutput } = params[key];
                  if (isOutput) {
                      // Parámetro de salida
                    request.output(key, type);
                  } else {
                      // Parámetro de entrada
                    request.input(key, type, value);
                  }
                }
             }
             // Ejecutar la consulta
             const result = await request.query(sql);

             // Retornar resultado y valores de salida
              return {
                          result,
                          output: request.parameters
                        };
              
        } catch (error) {
              logger.error(`Error al ejecutar la consulta: ${error}`);
              throw error;
        }
      }

    // Método para cerrar la conexión
    public async close(): Promise<void> {
        try {
          if (this.pool.connected) {
            await this.pool.close();
            logger.info('Conexión cerrada');
          }
        } catch (error) {
          logger.error(`Error al cerrar la conexión: ${error}`);
          throw error;
    }
  }
};