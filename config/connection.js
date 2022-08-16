require('dotenv').config();
const { DB_PORT, DB_HOST, JAWSDB_URL, DB_SQL_TYPE, DB_NAME, DB_USER, DB_PW } = process.env;
const Sequelize = require('sequelize');

const sequelize = JAWSDB_URL // * this is the connection to the database (using JAWSDB_URL) if using JAWSDB_URL (Heroku)
  ? new Sequelize(JAWSDB_URL) // * this is the connection to the database (using JAWSDB_URL) if using JAWSDB_URL (Heroku)
  : new Sequelize(DB_NAME, DB_USER, DB_PW, { // * this is the connection to the database (using DB_NAME, DB_USER, DB_PW) if using DB_NAME, DB_USER, DB_PW (local)
      host: DB_HOST, //! Check .env (default= localhost) host URL of the SQL database
      dialect: DB_SQL_TYPE, //! check .env (default=mysql) 'mysql'|'sqlite'|'postgres'|'mariadb'|'mssql'
      port: DB_PORT, //! Check port to the .env file (default=3306) port of the SQL database your using
      dialectOptions: { //DialectOptions is an object that holds options for the dialect you are using (mysql, postgres, etc)
      decimalNumbers: true, //!(default=false) decimalNumbers is a boolean that determines if the decimal numbers are returned as strings or numbers
      },
    });

module.exports = sequelize;

/**
 * // import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize('just_tech_news_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;
 */