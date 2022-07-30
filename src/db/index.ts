import dotenv from "dotenv";
import { Pool, type ClientConfig } from "pg";
import { PrismaClient } from "@prisma/client";

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

interface CustomNodeJSGlobal extends Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJSGlobal;

const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
    errorFormat: "pretty",
  });

// Logging middleware
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );
  return result;
});

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export { dbConfig, dbPool, prisma };
