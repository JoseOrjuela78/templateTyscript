
import dotenv from "dotenv";
dotenv.config();
import Server from "./src/common/server";
import { application } from "./src/application";
const server = new Server(application,3000);
server.listen();
