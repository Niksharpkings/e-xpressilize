// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {} // create a new class that extends the Model class from the sequelize library

// set up fields and rules for Product model
Product.init(
  // initialize the Product class with the sequelize constructor and the data types from the library (DataTypes) to use in our models (Model) (this is needed for the routes to work)
  {
    // define columns
    id: {
      // id is the primary key
      type: DataTypes.INTEGER, // type is an integer (INTEGER)
      allowNull: false, // doesn't allow null values (NOT NULL)
      primaryKey: true, // set as primary key (PRIMARY KEY)
      autoIncrement: true, // uses auto increment (AUTO_INCREMENT)
    },
    product_name: {
      // product_name is the name of the product (VARCHAR)
      type: DataTypes.STRING, // type is a string (STRING)
      allowNull: false, // doesn't allow null values (NOT NULL)
    },
    price: {
      // price is the price of the product (FLOAT)
      type: DataTypes.DECIMAL(10, 2), // type is a decimal (DECIMAL) with a precision of 10 and a scale of 2
      allowNull: false, // doesn't allow null values (NOT NULL)
      validate: {
        // validate the price field
        isNumeric: true, // make sure the price is a number
        isDecimal: true, // make sure the price is a decimal
      },
    },
    stock: {
      // stock is the stock of the product (INTEGER)
      type: DataTypes.INTEGER, // type is an integer (INTEGER)
      allowNull: false, // doesn't allow null values (NOT NULL)
      default: 10, // default stock to 10
      validate: {
        // validate the stock field
        isNumeric: true, // make sure the stock is a number
      },
    },
    category_id: {
      // category_id is the id of the category the product belongs to (INTEGER)
      type: DataTypes.INTEGER, // type is an integer (INTEGER)
      references: {
        // references the category table
        model: "category", // reference the category model
        key: "id", // reference the id field
      },
    },
  },
  {
    sequelize, // pass in our imported sequelize connection (the direct connection to our database)
    timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
    freezeTableName: true, // don't pluralize name of database table
    underscored: true, // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    modelName: "product", // make it so our model name stays lowercase in the database
  }
);

module.exports = Product;
