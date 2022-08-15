const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: { // id is the primary key
      type: DataTypes.INTEGER, // type is an integer
      allowNull: false, // doesn't allow null values
      primaryKey: true, // set as primary key
      autoIncrement: true // uses auto increment
    },
    category_name: { // category_name is the name of the category
      type: DataTypes.STRING, // type is a string
      allowNull: false, // doesn't allow null values
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

