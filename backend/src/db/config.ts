import { Pool } from "pg";
import dotenv from "dotenv"
dotenv.config()

const port = process.env.DB_PORT as unknown as number

const pool = new Pool({
  host: process.env.DB_ADDRESS,
  port: port,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
})

export default pool