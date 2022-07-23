var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/category", function (req, res, next) {
  res.send(["123", "234"]);
});

module.exports = router;
