var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({data: {score: 123}, title: "Title"})
});

module.exports = router;
