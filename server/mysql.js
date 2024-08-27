import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "samir",
  password: "password",
  database: "user_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

connection.end();
