//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connect to mongoose database
const url = "mongodb://localhost:27017";
const dbName = "todolistDB";
mongoose.connect(url + "/" + dbName);

// Define blueprint or schema for documents
const itemsSchema = {
  name: String
};

// Create model or collection
const Item = mongoose.model("Item", itemsSchema);

// Create some default documents
const item1 = new Item({
  name: "Hello"
});

const item2 = new Item({
  name: "Hit + to add a new item"
});

const item3 = new Item({
  name: "<--- Hit this to delete item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){
    // Check for error, if so log the err msg
    if (err) {
      console.log(err);
    }
    // Output list page and list items
    else {
      // Check if need to add default items
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully saved default items to DB");
          }
        });

        res.redirect("/");
      }
      // Render page and list
      else {
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
    }
  });
});

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName}, function(err, foundList){

    if (err) {
      console.log(err);
    }
    // Display page and list
    else {
      // Create new list
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        })

        list.save();
        res.redirect("/" + customListName);
      }
      // Show existing list
      else {
          res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  // Check if adding to default list
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  }
  // Add to custom list
  else {
    List.findOne({name: listName}, function(err, foundList){
      if (err) {
        console.log(err);
      }
      else {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      }
    });
  }

});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully deleted checked item from DB");
      }
    });

    res.redirect("/");
  }
  else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
      if (err) {
        console.log(err);
      }
      else {
        res.redirect("/" + listName);
      }
    })
  }

});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
