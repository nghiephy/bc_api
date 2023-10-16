var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');

let url = 'https://api.bigcommerce.com/stores/vwrie/v3/wishlists?customer_id=1';
let dataWishlist = '';
let options = {
  method: 'GET',
  headers: {'Content-Type': 'application/json', 'X-Auth-Token': '1dtb7yb1dsev0s9ac8hysmp4s6sthrt'}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => dataWishlist = json)
  .catch(err => console.error('error:' + err));

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send({title: "respond with a resource 1", data: dataWishlist});
});

module.exports = router;
