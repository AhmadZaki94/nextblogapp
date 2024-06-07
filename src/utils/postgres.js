import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "Zaki@1994",
  database: "postgres",
});

export default pool;
