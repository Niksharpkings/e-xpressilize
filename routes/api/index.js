const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

//this is so if we make a request to any endpoint that doesn't exist, we'll receive a 404 error indicating we have requested an incorrect resource, another RESTful API practice.
router.use((req, res) => { // use the router
  res // return the router to the client (the client can use the router)
    .status(404) // send a 404 status code and log to the console
    .end()
    .warn("you got a 404 status code, origin routes/api/index"); // end the response
});

module.exports = router;
