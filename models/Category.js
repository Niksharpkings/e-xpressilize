const { Model, DataTypes } = require('sequelize'); // import the sequelize constructor from the library and the data types from the library (DataTypes) to use in our models (Model) (this is needed for the routes to work)

const sequelize = require('../config/connection'); // import the sequelize constructor from the library (using JAWSDB_URL) if using JAWSDB_URL (Heroku)

class Category extends Model {} // create a new class that extends the Model class from the sequelize library

Category.init( // initialize the Category class with the sequelize constructor and the data types from the library (DataTypes) to use in our models (Model) (this is needed for the routes to work)
  {
    // define columns in the table
    id: { // id is the primary key
      type: DataTypes.INTEGER, // type is an integer (INTEGER)
      allowNull: false, // doesn't allow null values (NOT NULL)
      primaryKey: true, // set as primary key (PRIMARY KEY)
      autoIncrement: true // uses auto increment (AUTO_INCREMENT)
    },
    category_name: { // category_name is the name of the category (VARCHAR)
      type: DataTypes.STRING, // type is a string (STRING)
      allowNull: false, // doesn't allow null values (NOT NULL)
    },
  },
  {
    sequelize, // pass in our imported sequelize connection (the direct connection to our database)
    timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
    freezeTableName: true, // don't pluralize name of database table
    underscored: true, // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    modelName: 'category', // make it so our model name stays lowercase in the database
  }
);

module.exports = Category;

