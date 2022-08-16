const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection'); // * this is the connection to the database

const app = express(); // create an instance of express
const PORT = process.env.PORT || 3001; // set the port to 3001 if not specified in the .env file or process.env.PORT (Heroku)

app.use(express.json()); // use express.json() to parse JSON data in requests (req.body) into JavaScript objects (req.body) (this is needed for the routes to work)
app.use(express.urlencoded({ extended: true })); // use express.urlencoded() to parse URL-encoded data in requests (req.body) into JavaScript objects (req.body) (this is needed for the routes to work)

app.use(routes); // use the routes module (./routes)

// sync sequelize models to the database, then turn on the server
 // * this is the connection to the database
    sequelize
      .sync(
        { force: true } // use the .env file to change the value for security and quickness. if the value is set to true, the table will be dropped and re-created
      )
      .then(() => {
        app
          .listen(PORT, () => {
          console.log(`Your connected to the SQL Database & the E-xpressilize Server is Up and listening on port ${PORT}`);
        });
      }).catch(err => {
        console.log(err, 'Error at Server.js .catch ');
      }
    );



