import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "samir",
    password: "password",
    database: "user_db",
  },
  // connection: {
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  // },
  migrations: {
    tableName: "migrations_users",
    directory: resolve(__dirname, "migrations"),
  },
  seeds: {
    directory: resolve(__dirname, "seeds"),
  },
};
