const { Model, DataTypes } = require('sequelize');  // import the sequelize constructor from the library and the data types from the library (DataTypes) to use in our models (Model) (this is needed for the routes to work)

const sequelize = require('../config/connection.js'); // import the sequelize constructor from the library (using JAWSDB_URL) if using JAWSDB_URL (Heroku)

class Tag extends Model {}

Tag.init( // initialize the Tag class with the sequelize constructor and the data types from the library (DataTypes) to use in our models (Model) (this is needed for the routes to work)
  {
    // define columns
    id: {  // id is the primary key
      type: DataTypes.INTEGER, // type is an integer (INTEGER)
      allowNull: false, // doesn't allow null values (NOT NULL)
      primaryKey: true, // set as primary key (PRIMARY KEY)
      autoIncrement: true // uses auto increment (AUTO_INCREMENT)
    },
    tag_name: { // tag_name is the name of the tag (VARCHAR)
      type: DataTypes.STRING // type is a string (STRING)
    }
  },
  {
    sequelize, // pass in our imported sequelize connection (the direct connection to our database)
    timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
    freezeTableName: true, // don't pluralize name of database table
    underscored: true, // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    modelName: 'tag', // make it so our model name stays lowercase in the database
  }
);

module.exports = Tag;