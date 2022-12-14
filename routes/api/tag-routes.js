const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    // include: [Product] })
    attributes: ["id", "tag_name"],
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  })
    .then((tagGetData) => res.json(tagGetData)) // send the data back to the client as JSON in the response body and end the response
    .catch((err) => {
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (tag-routes GET )'
      );
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  })
    .then((tagGetIdData) => res.json(tagGetIdData))
    .catch((err) => {
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (tag-routes GET id)'
      );
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name,
  })
    .then((tagPostData) => res.json(tagPostData))
    .catch((err) => {
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (tag-routes POST )'
      );
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((tagPutData) => {
      if (!tagPutData) {
        res
          .status(404)
          .json({ message: "404 tagPutData: No tag found with this id" });
        return;
      }
      res.json(tagPutData);
    })
    .catch((err) => {
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (tag-routes PUT :id")'
      );
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagDeleteData) => {
      if (!tagDeleteData) {
        res
          .status(404)
          .json({ message: "404 tagDeleteData: No tag found with this id!" });
        return;
      }
      res.json(tagDeleteData);
    })
    .catch((err) => {
      console.warn(
        err,
        'Status 500 code, theres an error in the JSON (tag-routes DELETE)'
      );
      res.status(500).json(err);
    });
});

module.exports = router;
