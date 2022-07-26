import { Pool } from "pg";

const pool: Pool = new Pool({
  user: "brucesong",
  host: "localhost",
  database: "postgres",
  password: "SWWsww0920",
  port: 5432,
});

export default pool;
