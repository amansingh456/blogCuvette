const mysql = require("mysql2");
// require("dotenv").config()

const db = mysql.createConnection({
  host: "mydb.cpdmi4ml6suu.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "amansingh",
  database: "cuvetteblog",
});

module.exports = db;