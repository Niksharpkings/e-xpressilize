// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: { // id is the primary key
      type: DataTypes.INTEGER, // type is an integer
      allowNull: false, // doesn't allow null values
      primaryKey: true, // set as primary key
      autoIncrement: true // uses auto increment
    },
    product_name: { // product_name is the name of the product
      type: DataTypes.STRING, // type is a string
      allowNull: false // doesn't allow null values
    },
    price: { // price is the price of the product
      type: DataTypes.DECIMAL(10, 2), // type is a decimal with 10 digits and 2 decimal places
      allowNull: false, // doesn't allow null values
      validate: { // validate that the price is a number
        isDecimal: true // is a decimal
      }
    },
    stock: { // stock is the stock of the product
      type: DataTypes.INTEGER, // type is an integer
      allowNull: false, // doesn't allow null values
      defaultValue: 10, // default value is 10
      validate: { // validate that the stock is a number
        isInt: true // is an integer
      }
    },
    category_id: { // category_id is the id of the category the product belongs to
      type: DataTypes.INTEGER, // type is an integer
      references: { // references the category model
        model: 'category', // model is the category model
        key: 'id' // references the id field of the category model
      }
    },
    // post_url: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     isURL: true
    //   }
    // },
  },
  {
    sequelize,  // pass in our imported sequelize connection (the direct connection to our database)
    timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
    freezeTableName: true, // don't pluralize name of database table
    underscored: true,  // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    modelName: 'product', // make it so our model name stays lowercase in the database
  }
);

module.exports = Product;

