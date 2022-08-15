const router = require('express').Router();
const { Category, Product } = require('../../models');

/* Using the naming convention along with the use of the HTTP methods
Representational State Transfer API architectural pattern called REST or RESTful APIs (https://restfulapi.net/).
Name the endpoints in a way that describes the data you're interfacing with.
Use HTTP methods like GET, POST, PUT, and DELETE to describe the action
you're performing to interface with that endpoint;
for example, GET /api/categories means you should expect to receive user data.
Use the proper HTTP status codes like 400, 404, and 500 to indicate errors in a request.
*/
// The `/api/categories` endpoint

router
  .get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category
    .findAll({
      // attributes: [
      //   'id',
      //   'category_name',
      // ],
      // exclude: ['createdAt','updatedAt',],
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'category_id',
          ],
        }
      ],
  })
    .then((dbCategoryData)=> res
      .json(dbCategoryData))
    .catch(err => {
      console
        .log(err);
      res
        .status(500)
        .json(err);
    })
});

router
  .get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    Category
      .findOne({
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          }
        ],
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({
            message: 'No category found with this id'
          });
      return;
    }
      res
        .json(dbCategoryData);
    })
      .catch(err => {
        console
        .log(err);
      res
        .status(500)
        .json(err);
    });
});


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(
      dbCategoryData => res.json(dbCategoryData)
    )
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
        res
          .status(404)
          .json({
            message: 'No category found with this id'
          });
        return;
      }
      res
        .json(dbCategoryData);
    })
    .catch(err => {
      console
        .log(err);
      res
        .status(500)
        .json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({
            message: 'No category found with this id'
          });
        return;
      }
      res
        .json(dbCategoryData);
    })
    .catch(err => {
      console
        .log(err);
      res
        .status(500)
        .json(err);
    });
});

module.exports = router;
