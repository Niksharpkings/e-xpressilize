const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: { // id is the primary key
      type: DataTypes.INTEGER, // type is an integer
      allowNull: false, // doesn't allow null values
      primaryKey: true, // set as primary key
      autoIncrement: true // uses auto increment
    },
    product_id: { // product_id is the id of the product
      type: DataTypes.INTEGER, // type is an integer
      references: { // references the product model
        model: 'product', // model is the product model
        key: 'id' // references the id field of the product model
      }
    },
    tag_id: { // tag_id is the id of the tag
      type: DataTypes.INTEGER, // type is an integer
      references: { // references the tag model
        model: 'tag', // model is the tag model
        key: 'id' // references the id field of the tag model
      }
    },
  },
  {
    sequelize,  // pass in our imported sequelize connection (the direct connection to our database)
    timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
    freezeTableName: true, // don't pluralize name of database table
    underscored: true,  // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    modelName: 'product_tag', // make it so our model name stays lowercase in the database
  }
);

module.exports = ProductTag;


