/**
 * BigCommerce Express Hello World App
 *
 * A simple Express app to quickly demonstrate
 * single-click app OAuth flow.
 *
 * Note: not intended for production use.
 **/

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cors = require('cors')

// App Routes ============================================
var auth = require("./routes/auth");
var load = require("./routes/load");
var uninstall = require("./routes/uninstall");
// ========================================================

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "/views");
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// App Routes ============================================+
app.use("/auth", auth);
app.use("/load", load);
app.use("/uninstall", uninstall);
// ========================================================

app.use(cors())

var listener = app.listen(3000, function() {
  console.log("Listening on port " + listener.address().port);
});
