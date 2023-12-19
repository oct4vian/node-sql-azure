const express = require("express");
const sql = require("msnodesqlv8");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const connectionString = process.env.CONNECTION_STRING;
const query = "SELECT name FROM sys.databases";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api", async (req, res) => {
  return new Promise((resolve, reject) => {
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        const message = `Could not connect to db. ${err.message}`;
        console.error(err);
        return res.send({ message });
      }

      console.log('Connection ok')
      res.send({ message: "Connection ok", data: rows });
    });
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
