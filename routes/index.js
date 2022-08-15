const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router
  .use((req, res) => {
    res
      .send("<h1>Hey that Wrong Route, but look at the bright side. its a 200 not a 404. Check out /api/categories </h1>")
});
//! Add this to the end of the file. If you land on a page that is not made you will be directed to a 404 page.
router
  .use((req, res) => {
  res
    .status(404, console.log("404 Page, Page You Can't Go There"))
    .end();
});

module.exports = router;