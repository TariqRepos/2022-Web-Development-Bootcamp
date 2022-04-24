//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Lets to rextrive data from html and extends to nested casese
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  // console.log(req.body);
  // console.log(req.body.num1);
  // console.log(req.body.num2);

  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);
  var result = num1 + num2;

  res.send("The result of the Calculation is " + result);
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
