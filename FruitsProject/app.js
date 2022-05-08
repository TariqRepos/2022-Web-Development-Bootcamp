const mongoose = require('mongoose');

// Conncection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "fruitsDB";

// Conccet to database
mongoose.connect(url + "/" + dbName);

// Schema or blueprint for document in fruitsDB collections
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified"]
  },
  rating: {
      type: Number,
      min: 1,
      max: 10
  },
  review: String
});

// Model generated from schema
const Fruit = mongoose.model("Fruit", fruitSchema);

// Example document
const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid fruit"
});

// Save document to collection
// fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 4,
  review: "Simple fruit"
});

// pineapple.save();

const amy = new Person ({
  name: "Amy",
  age: 19,
  favoriteFruit: pineapple
});

// amy.save();

const person = new Person ({
  name: "John",
  age: 32
});

// person.save();

const mango = new Fruit({
  name: "mango",
  rating: 10,
  review: "Great fruit"
});

// mango.save();

// Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document");
//   }
// });

const kiwi = new Fruit ({
  name: "Kiwi",
  rating: 8,
  review: "Green fruit"
});

const orange = new Fruit ({
  name: "Orange",
  rating: 6,
  review: "Morning time fruit"
});

const banana = new Fruit ({
  name: "banana",
  rating: 10,
  review: "This fruit has potassium"
});

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully save all fruits to fruitsDB");
//   }
// });

Fruit.find(function(err, fruitDocs) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();

    fruitDocs.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id: "sd342423fdas342324"}, {name: "Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document");
//   }
// });

// await Fruit.deleteOne({name: "Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document");
//   }
// });

// Person.deleteMany({name: "John"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted all the documents");
//   }
// });

// If the Node process ends, close the Mongoose connection
// process.on('SIGINT', function() {
//   mongoose.connection.close(function () {
//     console.log('Mongoose disconnected on app termination');
//     process.exit(0);
//   });
// });
