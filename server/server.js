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

/* EXPRESS CONFIG */
app.set("view engine", "ejs");
app.set('trust proxy', 1);
const middlewares = [
  morgan('dev'),
  methodOverride("_method"),
  express.static('public'),
  bodyParser.urlencoded({ extended: true }),
  // cookieParser(),
  express.static("public"),
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
// app.use("/tweets", tweetsRoutes);

/* LISTENING */
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

/*======================================
    PAGES
========================================*/

// Home
app.get("/", (req, res) => {
  req.flash("success", "Testing");
  if(req.session) console.log(req.session);
  // res.send("test");
  res.render("index");
});

// Cliq-it
app.get("/cliq_it", (req, res) => {
  // let templateData = {
  // };
  res.render("cliq_it");
  // res.render("polls_index", templateData);
});

/*======================================
    OPERATIONS
========================================*/