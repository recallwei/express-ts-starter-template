var express = require("express");
var router = express.Router();

/**
 * GET /
 * @summary Home
 * @tags Home
 * @return {object} 200 - OK
 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
