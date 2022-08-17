require('dotenv').config();
const { SQL_NAME, SQL_USER, SQL_PW, SQL_HOST, SQL_PORT, SQL_DIALECT } = process.env; // comment it out if using JAWSDB_URL (Heroku) if localhost or other URL, use the dotenv package to import the .env file. just replace the 'localhost', '3306', 'mysql' with DB_HOST, DB_PORT, DB_SQL_TYPE and remove the "process.env." down below ash show in default.
const Sequelize = require('sequelize');

// * this is the connection to the database (using JAWSDB_URL) if using JAWSDB_URL (Heroku)
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(SQL_NAME, SQL_USER, SQL_PW, {
      host: SQL_HOST, //! Check .env (default= localhost) host URL of the SQL database
      dialect: SQL_DIALECT, //! check .env (default=mysql) 'mysql'|'sqlite'|'postgres'|'mariadb'|'mssql'
      port: SQL_PORT, //! Check port to the .env file (default=3306) port of the SQL database your using
      dialectOptions: { //! DialectOptions is an object that holds options for the dialect you are using (mysql, postgres, etc)
      decimalNumbers: true, //!(default=false) decimalNumbers is a boolean that determines if the decimal numbers are returned as strings or numbers
      },
    });

module.exports = sequelize;
