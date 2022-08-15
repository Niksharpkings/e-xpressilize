const express = require('express');
const routes = require('./routes');
// const schema = require('./db/schema.sql');
// import sequelize connection
const sequelize = require('./config/connection'); // * this is the connection to the database

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize
  .sync({force: true})
  .then(() => {app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
  })
  .catch(err => {
  console.log(err, "server.js err in sequelize sync");
});


