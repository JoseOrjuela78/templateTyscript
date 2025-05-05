import { NextFunction, Request, Response } from "express";
import { AuthOperations } from "../../modules/auth/adapters/auth.operations";
import { Db1 } from "../adapter/db1";
import { LoggerService } from "../../common/logger";
const logger = new LoggerService();


const dbInstance = new Db1();
const authOperations = new AuthOperations(dbInstance);

// Caché global
let cache = {
    userId: null as number | null,
    paths: null as any[] | null,
    timestamp: null as number | null, // Marca de tiempo en milisegundos
};

export class AuthorizationGuard {
    static async execute(request: Request, response: Response, next: NextFunction): Promise<any> {
        const user_id = response.locals.user_id;
        const pathToValidate = request.originalUrl;

        if (!user_id) {
            return response.status(403).json({ message: "Forbidden: User ID missing" });
        }

        try {
            const currentTime = Date.now(); // Tiempo actual en milisegundos

            // Verificamos si el caché es válido
            const isCacheValid =
                cache.userId === user_id &&
                cache.timestamp !== null &&
                currentTime - cache.timestamp < 30 * 60 * 1000; // 30 minutos en milisegundos

            if (!isCacheValid) {
                logger.info("El caché ha expirado o el user_id ha cambiado. Llamando a getPaths...");
                cache.userId = user_id; // Actualizamos el userId en caché
                cache.paths = (await authOperations.getPaths(user_id)).DATA; // Actualizamos los paths en caché
                cache.timestamp = currentTime; // Actualizamos el timestamp
            } else {
                logger.info(`new Date().toString() "Usando paths en caché..."`)
            }

            // Validamos si el path actual está permitido
            const isPathIncluded = cache.paths?.some(item => item.PATH === pathToValidate);

            if (!isPathIncluded) {
                return response.status(403).json({ message: "Access to this path is not allowed." });
            }
            logger.info(`new Date().toString() "Access allowed"`)
            next();
        } catch (error:any) {
            logger.error(`${new Date().toString()} Error processing authorization: ${error.message}`);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
}