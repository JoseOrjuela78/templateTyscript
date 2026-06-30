
import Server from "./src/common/server";
import { application } from "./src/application";
import { Ihttps } from "./src/common/models/IhttpOptions";
import e from "./src/common/config/enviroment-vars";
import AppDataSource from './src/common/database/data-source'

const dataSource = async()=>{
try {
    await AppDataSource.initialize();
    console.log("Conectado a la base de datos 🚀");
    
} catch (error) {
    console.error("Error al conectar:", error)
} finally {
    // 🔴 Cerrar conexión SIEMPRE
    await AppDataSource.destroy();
    console.log("Conexión cerrada 🔒");
}
};



const port = e.envs.PORT;
const https_options: Ihttps ={
    key:'',
    cert:''
};

const server = new Server(application, port, https_options);
try {
    server.initialize();
    dataSource();
} catch (error:any) {
    console.log(`Error:${error.message}`);
};

