"use strict";

require('dotenv').config();

const PORT           = process.env.PORT || 8080;
const ENV            = process.env.ENV  || "development";

const express        = require("express");
const bodyParser     = require("body-parser");
const app            = express();
const morgan         = require('morgan');
const session        = require('express-session');
const methodOverride = require('method-override');
const flash          = require('connect-flash');
const { v4: uuidv4 } = require('uuid');
// const MongoClient    = require("mongodb").MongoClient;
// const MONGODB_URI    = "mongodb://localhost:27017/tweeter";
// const bcrypt         = require('bcryptjs');

/*======================================
    EXPRESS CONFIGURATION
========================================*/

app.set("view engine", "ejs");
app.set('trust proxy', 1);

/* MIDDLEWARES */
const middlewares = [
  morgan('dev'),
  methodOverride("_method"),
  express.static('public'),
  bodyParser.urlencoded({ extended: true }),
  // cookieParser(),
  session({
    genid: function(req) {
      return uuidv4();
    },  
    secret: [process.env.SESSION_SECRET_NEW, process.env.SESSION_SECRET_OLD],
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: true,
      maxAge: 60000
    }
  }),
  flash()
];
app.use(middlewares);

/* ROUTES */
// const tweetsRoutes = require("./routes/tweets")(DataHelpers);
// app.use("/tweets", tweetsRoutes);

/* LISTENING */
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

/*======================================
    PAGES
========================================*/

// Index/Root
app.get("/", (req, res) => {
  // req.flash("success", "Testing");
  // if(req.session) console.log(req.session);
  res.render("index");
});

// Home
app.get("/home", (req, res) => {
  res.render("home");
});

// Chat
app.get("/chat", (req, res) => {
  res.render("chat");
});

// Dune
app.get("/dune", (req, res) => {
  res.render("dune");
});

// Rain
app.get("/rain", (req, res) => {
  res.render("rain");
});

// Cliq-it
app.get("/cliq_it", (req, res) => {
  res.render("cliq_it");
  // res.render("polls_index", templateData);
});

// Sorting
app.get("/sorting", (req, res) => {
  res.render("sorting");
});

// Codenames
// app.get("/codenames", (req, res) => {
//   res.render("codenames");
// });

/*======================================
    OPERATIONS
========================================*/