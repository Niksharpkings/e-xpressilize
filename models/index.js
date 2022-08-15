// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product
  .belongsTo(Category,
  {
    foreignKey: 'category_id'
  }
);

// Categories have many Products as a reverse association
Category
  .hasMany(Product,
  {
  foreignKey: 'category_id'
  }
);
// Category
//   .belongsToMany(Product,
//   {
//     through: ProductTag
//   });
// Product
//   .belongsToMany(Category,
//     {
//       through: ProductTag
//     });

// Products belongToMany Tags (through ProductTag)
Product
  .belongsToMany(Tag,
  {
    through: ProductTag,
    as: 'tags',
    foreignKey: 'product_id'
  });

// Tags belongToMany Products (through ProductTag)
Tag
  .belongsToMany(Product,
  {
    through: ProductTag,
    as: 'products',
    foreignKey: 'tag_id'
  });


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
