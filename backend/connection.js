const { Pool } = require("pg");
const credentials = new Pool({
  user: "postgres",
  Password: "1234",
  host: "localhost",
  port: 5433,
  database: "ExpressShopDB",
  ssl: false,
});

module.exports = credentials;
