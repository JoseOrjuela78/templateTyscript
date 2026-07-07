
import Server from "./src/common/server";
import { application } from "./src/application";
import { Ihttps } from "./src/common/models/IhttpOptions";
import e from "./src/common/config/enviroment-vars";
import database from "./src/common/database/data-source";
import Logger from "./src/common/logger";

const logger = new Logger();
const port = e.envs.PORT;
const https_options: Ihttps ={
    key:'',
    cert:''
};

const startApp = async () => {
  try {
    // ✅ Conectar base de datos
    const db = database;
    logger.info("Pool de PostgreSQL creado");
    await db.execQuery("SELECT 1");
    logger.info("Conexión BD verificada");

    // ✅ Iniciar servidor SOLO si la BD funciona
    const server = new Server(application, port, https_options);
    await server.initialize();
    await db.close();
   
  } catch (error: any) {
    logger.error(`Error iniciando la aplicación:", ${error.message}`);
    process.exit(1); // ✅ cerrar app si falla todo
  }
};

startApp();


