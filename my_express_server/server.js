//jshint esversion:6

const express = require('express');
const app = express();

app.get("/", function(req, res) {
  // console.log(req);
  res.send("<h1>Hello</h1>");
});

app.get("/contact", function(req, res) {
  res.send("Contact me at: email@mail.com");
});

app.get("/about", function(req, res) {
  res.send("My name is Tariq");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
