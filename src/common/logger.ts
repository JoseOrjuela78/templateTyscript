import winston from 'winston';


export class LoggerService{

    private readonly logger: winston.Logger;

    constructor() {
      this.logger = winston.createLogger({
      level: 'info', // Nivel mínimo de registro
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(), // Mostrar en consola
        new winston.transports.File({   maxFiles: 25,
                                        filename: `error.log`,
                                        level: 'error' }) // Guardar en archivo
      ],
        });
    }


// Métodos de logging
  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

};