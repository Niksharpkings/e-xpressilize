const router = require('express').Router(); // create an instance of express.Router()
const apiRoutes = require('./api'); // import the api routes

router.use('/api', apiRoutes); // use the apiRoutes module (./api)

router // export the router
  .use((req, res) => { // use the router
    res // return the router to the client (the client can use the router) 
      .send("<h1>Hey that Wrong Route, but look at the bright side. its a 200 not a 404. Check out /api/categories </h1>")
}); 
//! Add this to the end of the file. If you land on a page that is not made you will be directed to a 404 page.
router // export the router
  .use((req, res) => { // use the router
  res // return the router to the client (the client can use the router)
    .status(404,
      console.log("404 Page, Page You Can't Go There")) // send a 404 status code and log to the console
    .end(); // end the response
});

module.exports = router;