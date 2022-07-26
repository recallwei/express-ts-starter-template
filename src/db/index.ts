import { Pool, Client } from "pg";

const config = {
  host: "bruce-postgresql.postgres.database.azure.com",
  // Do not hard code your username and password.
  // Consider using Node environment variables.
  user: "bruce",
  password: "SWWsww0920",
  database: "postgres",
  port: 5432,
  ssl: true,
};

const client = new Client(config);

export { client, config };
