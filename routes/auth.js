const express = require("express"),
  router = express.Router(),
  BigCommerce = require("node-bigcommerce");

/**
 * sandoxes are public on the web by default
 * do not hard-code any credentials here
 * use codesandbox environment variables
 */
const bigCommerce = new BigCommerce({
  logLevel: "info",
  clientId: process.env.client_id, // set in  condesandbox server control panel
  secret: process.env.client_secret, // set in condesandbox server  control panel
  callback: process.env.callback, // set in condesandbox server control pannel
  responseType: "json",
  headers: { "Accept-Encoding": "*" },
  apiVersion: "v3"
});

router.get("/", (req, res, next) => {
  console.log("bigCommerce", bigCommerce);
  console.log("req.query", req.query);
  bigCommerce
    .authorize(req.query)
    .then(data => {
      if (typeof data.access_token !== "undefined") {
        //===========================================================+
        // data.acces_token
        //
        // If authorize successful, data object will contain access_token
        // store securely in DB; use to make API request to BigCOmmerce
        // ==========================================================+

        const storeHash = data.context.split("/")[1];
        res.send(
          `Authorization Successful<br><a href="https://store-${storeHash}.mybigcommerce.com/manage/marketplace/apps/my-apps">My Apps</a>`
        );
      } else {
        res.send("Authorization Failed");
      }
    })
    .catch(next);
});

module.exports = router;
