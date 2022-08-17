const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    attributes: ["id", "product_name", "price", "stock", "category_id"],
    include: [
      {
        model: Category, // include the categories table (model) and include the attributes of the categories table (attributes)
        attributes: ["id", "category_name"],
      },
      {
        model: Tag, // include the tags table (model) and include the attributes of the tags table (attributes)
        attributes: ["id", "tag_name"],
      },
    ],
  })
    .then((productGetData) => res.json(productGetData)) // send the data back to the client as JSON in the response body and end the response
    .catch((err) => {
      // if there is an error
      console.warn(err,"Status 500 code, theres an error in the JSON (product-routes GET)");
      res
        .status(500) // send a 500 status code and the error as JSON in the response body and end the response
        .json(err); // end the response
    });
});

// get one product
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    // include: [Category, Tag] })
    where: {
      // find the product with the id of the req.params.id value (the id of the product)
      id: req.params.id, // find the product with the id of the req.params.id value (the id of the product)
    },
    attributes: [
      // include the attributes of the products table
      "id",
      "product_name",
      "price",
      "stock",
      "category_id",
    ],
    include: [
      // include the categories table (model) and include the attributes of the categories table (attributes)
      {
        model: Category, // include the categories table (model) and include the attributes of the categories table (attributes)
        attributes: [
          // include the attributes of the categories table
          "id", // include the id of the category
          "category_name", // include the category name
        ],
      },
      {
        model: Tag, // include the tags table (model) and include the attributes of the tags table (attributes)
        attributes: ["id", "tag_name"],
      },
    ],
  })
    .then((productGetIDData) => res.json(productGetIDData)) // send the data back to the client as JSON in the response body and end the response
    .catch((err) => {
      // if there is an error
      console.warn(
        err,
        "Status 500 code, theres an error in the JSON (product-routes GET id)"
      );
      res // send a 500 status code and the error as JSON in the response body and end the response
        .status(500) // send a 500 status code and the error as JSON in the response body and end the response
        .json(err); // end the response
    });
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create({
    // create a new product in the database
    product_name: req.body.product_name, // set the product_name to the req.body.product_name value
    price: req.body.price, // set the price to the req.body.price value
    stock: req.body.stock, // set the stock to the req.body.stock value
    category_id: req.body.category_id, // set the category_id to the req.body.category_id value
    tagIds: req.body.tagIds, // set the tagIds to the req.body.tagIds value
  })
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model (through the ProductTag table)
      if (req.body.tagIds.length) {
        // if there are product tags
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          // create an array of product tag ids
          return {
            // create a new object for each product tag id
            product_id: product.id, // set the product_id to the product.id value
            tag_id, // set the tag_id to the tag_id value
          };
        });
        return ProductTag.bulkCreate(productTagIdArr); // bulk create the product tag ids in the ProductTag model
      }
      // if no product tags, just respond
      res // send a 201 status code and the product as JSON in the response body and end the response
        .status(200) // send a 200 status code and the product as JSON in the response body and end the response
        .json(product); // end the response
    })
    .then((productTagIds) =>
      res // send a 201 status code and the product as JSON in the response body and end the response
        .status(200) // send a 200 status code and the product as JSON in the response body and end the response
        .json(productTagIds)
    ) // end the response
    .catch((err) => {
      // if there is an error
      console.warn(
        err,
        "Status 500 code, theres an error in the JSON (product-routes POST)"
      );
      res // send a 400 status code and the error as JSON in the response body and end the response
        .status(400) // send a 400 status code and the error as JSON in the response body and end the response
        .json(err); // end the response
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(
    {
      product_name: req.body.product_name, // set the product_name to the req.body.product_name value
      product_id: req.body.product_id, // set the product_id to the req.body.product_id value
    },
    {
      where: {
        // find the product with the id of the req.params.id value (the id of the product)
        id: req.params.id, // find the product with the id of the req.params.id value (the id of the product)
      },
    }
  )
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } }); // find all associated tags from ProductTag
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id); // get list of current tag_ids
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds // create filtered list of new tag_ids
        .filter((tag_id) => !productTagIds.includes(tag_id)) // filter the new tag_ids to only those that are not in the current tag_ids
        .map((tag_id) => {
          // create a new object for each new tag_id
          return {
            // create a new object for each new tag_id
            product_id: req.params.id, // set the product_id to the req.params.id value
            tag_id, // set the tag_id to the tag_id value
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags // figure out which ones to remove
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id)) // filter the product tags to only those that are not in the new tag_ids
        .map(({ id }) => id); // get list of ids to remove

      // run both actions
      return Promise.all([
        // run both actions in parallel
        ProductTag.destroy({
          // run both actions and return the results
          // run both actions (destroy the product tags to remove)
          where: {
            // run both actions
            id: productTagsToRemove, // run both actions
          },
        }),
        ProductTag.bulkCreate(newProductTags), // run both actions and return the results
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags)) // send the data back to the client as JSON in the response body and end the response
    .catch((err) => {
      console.warn(
        err,
        "Status 500 code, theres an error in the JSON (product-routes GET id)"
      ); // if there is an error
      res
        .status(400) // send a 400 status code and the error as JSON in the response body and end the response
        .json(err); // end the response
    });
});

router.delete("/:id", (req, res) => {
  // delete product
  // delete one product by its `id` value
  Product.destroy({
    // delete one product by its `id` value
    where: {
      // delete one product by its `id` value
      id: req.params.id, // delete one product by its `id` value
    }, // delete one product by its `id` value
  })
    .then((productDeleteData) => {
      // if there is dbCategoryData
      if (!productDeleteData) {
        // if there is no dbCategoryData
        res.status(404).json({
          message: "No comment found with this id!",
        });
        return;
      }
      res.json(productDeleteData);
    })
    .catch((err) => {
      console.warn(
        err,
        "Status 500 code, theres an error in the JSON (product-routes DELETE :id)"
      );
      res.status(500).json(err);
    });
});

module.exports = router;
