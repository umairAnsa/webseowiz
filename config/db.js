import mysql from "mysql";

const connection = mysql.createConnection({
  host: process.env.ENVIRONMENT,
  user: process.env.ROOTS,
  password: "",
  database: process.env.DB_NAME,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
export default connection;