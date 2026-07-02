import winston from "winston";

class Logger {

  private logger: winston.Logger;

  constructor() {
    this.logger = this.createLogger();
  }

  private createLogger(): winston.Logger {
    const { combine, timestamp, printf, colorize } = winston.format;

    // ✅ formato base
    const logFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    });

    return winston.createLogger({
      level: "info",
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
      transports: [
        // ✅ Archivo SOLO errores
        new winston.transports.File({
          filename: "errors.txt",
          level: "error"
        }),

        // ✅ Consola con colores
        new winston.transports.Console({
          format: combine(
            colorize({
              all: true,
              colors: {
                info: "green",
                error: "red"
              }
            }),
            timestamp({ format: "HH:mm:ss" }),
            logFormat
          )
        })
      ]
    });
  }

  // ✅ Métodos públicos

  info(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }
}

// ✅ Exportar instancia (singleton)
const logger = new Logger();
export default logger;
``