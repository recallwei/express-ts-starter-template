import { Pool } from "pg";

const pool: Pool = new Pool({
  user: "me",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

export default pool;
