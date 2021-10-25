var express = require("express");
var app = express();
var port = process.env.PORT || 4040;
const MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var configDB = require("./config/database.js");

var db;

mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err);
  db = database;
  require("./app/routes.js")(app, passport, db);
});

require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(
  session({
    secret: "rcbootcamp2021b",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.listen(port);
console.log("Join Mom-to-Mom on " + port);
