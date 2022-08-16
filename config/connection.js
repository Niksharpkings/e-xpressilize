require('dotenv').config();
// const { DB_NAME, DB_USER, DB_PW, DB_HOST, DB_PORT, DB_SQL_TYPE } = process.env; // comment it out if using JAWSDB_URL (Heroku) if localhost or other URL, use the dotenv package to import the .env file. just replace the 'localhost', '3306', 'mysql' with DB_HOST, DB_PORT, DB_SQL_TYPE and remove the "process.env." down below ash show in default.
const Sequelize = require('sequelize');
// * this is the connection to the database (using JAWSDB_URL) if using JAWSDB_URL (Heroku)
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost', //! Check .env (default= localhost) host URL of the SQL database
      dialect: 'mysql', //! check .env (default=mysql) 'mysql'|'sqlite'|'postgres'|'mariadb'|'mssql'
      port: '3306', //! Check port to the .env file (default=3306) port of the SQL database your using
      dialectOptions: { //! DialectOptions is an object that holds options for the dialect you are using (mysql, postgres, etc)
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