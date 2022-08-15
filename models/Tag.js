const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: {
      // id is the primary key
      type: DataTypes.INTEGER, // type is an integer
      allowNull: false, // doesn't allow null values
      primaryKey: true, // set as primary key
      autoIncrement: true, // uses auto increment
    },
    tag_name: {
      // product_id is the id of the product
      type: DataTypes.INTEGER, // type is an integer
      allowNull: false, // doesn't allow null values
    },
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
