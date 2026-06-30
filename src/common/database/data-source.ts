import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: 'ep-round-cherry-ai57ugbo-pooler.c-4.us-east-1.aws.neon.tech',
  port: 5432,
  username: 'neondb_owner',
  password: 'npg_gSwk2scY4IUW',
  database: 'neondb',
  synchronize: true, // solo en desarrollo
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false, // 🔴 IMPORTANTE para muchos providers cloud
  }

});

export default AppDataSource;
