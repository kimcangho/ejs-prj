//jshint esversion:6

//Require modules - express, body-parser, ejs
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

//Declare constants
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutStartingContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactStartingContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

const app = express();

//Initialize ejs
app.set('view engine', 'ejs');

//Use body-parser and public static files to be used by express
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Get request for home route
app.get("/", function(req, res) {
  res.render("home", {homeContent: homeStartingContent, postArray: posts});
});

//Get request for about route
app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutStartingContent});
});

//Get request for contact route
app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactStartingContent});
});

//Get request for compose route
app.get("/compose", function(req, res) {
  res.render("compose");
});

//Handle Post request for compose route
app.post("/compose", function(req, res) {
  const post = {title: req.body.postTitle, entry: req.body.composeEntry};
  posts.push(post);

  res.redirect("/");
});

// Handle post requests from post path topic parameters
app.get("/posts/:topic", function(req, res) {

  //Raise flag if match found
  let matchFlag = false;

  posts.forEach(function(post) {
    //Declare lowercase constants converted with lodash
    const storedTitle = _.lowerCase(post.title);
    const requestedTitle = _.lowerCase(req.params.topic);
    //Compare titles and flag if true
    if (storedTitle === requestedTitle) {
      matchFlag = true;
    }
    //Match control logic
    if (matchFlag === true) {
      // console.log("MATCH FOUND!");
      //Render post.ejs page with dynamically populated title and content
      res.render("post", {postTitle: post.title, postEntry: post.entry});
    }
  });

  //No match control logic
  if (matchFlag === false) {
    // console.log("NO MATCHES...")
    res.render("error");
  }

});

//Error page
app.get("/:topic", function(req, res) {
  res.render("error");
});

//Listen in on server startup
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
