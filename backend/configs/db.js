const mysql = require("mysql2");
// require("dotenv").config()

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12646424",
  password: "X6iTjmu4F8",
  database: "sql12646424",
});

module.exports = db;
