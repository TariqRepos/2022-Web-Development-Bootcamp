//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

const items = ["item1", "item2", "item3"];
const workItems = ["work1", "work2", "work3"];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
  const day = date.getDate();
  res.render('list', {ListTitle: day, newListItems: items});
});

app.post("/", function(req, res) {
  const item = req.body.newItem;

  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render('list', {ListTitle: "Work List", newListItems: workItems});
})

app.listen(3000, function(){
  console.log("Sever is running on port 3000");
})
