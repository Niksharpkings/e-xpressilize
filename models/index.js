// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product // Product is the model name and it belongs to table name Category
  .belongsTo(Category,
  {
    foreignKey: 'category_id' // foreign key is category_id (the id of the category) in the product table (the table that belongs to the product model)
  }
)

// Categories have many Products as a reverse association
Category // Category is the model name and it has "many" products (as a reverse association) in the product table (the table that belongs to the product model)
  .hasMany(Product,
  {
  foreignKey: 'category_id' // foreign key is category_id (the id of the category) in the product table (the table that belongs to the product model)
  }
)

// Products belongToMany Tags (through ProductTag)
Product // Product is the model name and it "belongs to many" tags (through the productTag table) in the Product table (the table that belongs to the Product model)
  .belongsToMany(Tag, // Tag is the model name and it "belongs to many" Products (through the product_tag table) in the tag table (the table that belongs to the tag model)
  {
    through: ProductTag, // The sequelize through model is ProductTag.
    as: 'tags', // The table that connects the product and tag models through the product_tag table.
    foreignKey: 'product_id' //  The table that belongs to the productTag model foreignKey is product_id (the id of the product) 
  })

// Tags belongToMany Products (through ProductTag)
Tag // Tag is the model name and it "belongs to many" Products (through the productTag table) in the tag table (the table that belongs to the tag model)
  .belongsToMany(Product,  // Product is the model name and it "belongs to many" tags (through the product_tag table) in the product table (the table that belongs to the product model)
  {
    through: ProductTag, // The sequelize through model is ProductTag.
    as: 'products', // The table that connects the product and tag models through the product_tag table.
    foreignKey: 'tag_id' // The table that belongs to the productTag model foreignKey is tag_id (the id of the tag)
  })

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
