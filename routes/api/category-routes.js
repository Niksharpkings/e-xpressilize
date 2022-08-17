const router = require("express").Router();
const { Category, Product } = require("../../models");
/* Using the naming convention along with the use of the HTTP methods
Representational State Transfer API architectural pattern called REST or RESTful APIs (https://restfulapi.net/).
Name the endpoints in a way that describes the data you're interfacing with.
Use HTTP methods like GET, POST, PUT, and DELETE to describe the action
you're performing to interface with that endpoint;
for example, GET /api/categories means you should expect to receive user data.
Use the proper HTTP status codes like 400, 404, and 500 to indicate errors in a request.
*/
// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    // get all categories from the Category model class and include the Product model class
    attributes: ["id", "category_name"],
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((categoryGetData) => res.json(categoryGetData)) // send the data back to the client as JSON in the response body and end the response
    .catch((err) => {
      // if there is an error
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (category-routes GET)'
      ); // log the error to the console
      res.status(500).json(err); // send a 500 status code and the error as JSON in the response body and end the response
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id, // find the category with the id of the req.params.id value (the id of the category)
    },
    include: [
      {
        model: Product, // include the products table (model) and include the attributes of the products table (attributes)
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((categoryGetIdData) => res.json(categoryGetIdData))
    .catch((err) => {
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (category-routes GET :id)'
      );
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name, // create a new category with the category_name from the request body
  })
    .then((categoryPostData) => res.json(categoryPostData))
    .catch((err) => {
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (category-routes POST :id)'
      );
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categoryPutData) => {
      if (!categoryPutData) {
        res
          .status(404)
          .json({ message: "PUT request 404: No category found with this id" });
        return;
      }
      res.json(categoryPutData);
    })
    .catch((err) => {
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (category-routes PUT :id)'
      );
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryDeleteData) => {
      if (!categoryDeleteData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(categoryDeleteData);
    })
    .catch((err) => {
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (category-routes DELETE :id)'
      );
      res.status(500).json(err);
    });
});

module.exports = router;
