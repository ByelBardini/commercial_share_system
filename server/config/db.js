import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "share_comercial",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL: ", err);
    return;
  }
  console.log("Conexão com MySQL estabelecida com sucesso!");
});

export default connection;