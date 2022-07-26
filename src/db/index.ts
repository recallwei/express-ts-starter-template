import dotenv from "dotenv";
import { Pool, type ClientConfig } from "pg";

dotenv.config();

const dbConfig: ClientConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? ~~process.env.DB_PORT : undefined,
  ssl: true,
};

const dbPool = new Pool(dbConfig);

export { dbConfig, dbPool };
