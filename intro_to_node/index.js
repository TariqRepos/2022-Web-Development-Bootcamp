//jshint esversion:6

// // Print to console
// console.log("Hello World!");

// // Internal packages: file sysytem practice
// const fs = require('fs');
//
// fs.copyFileSync("file1.txt", "file2.txt");

// External packages: superheros
var superheroes = require("superheroes");
const supervillains = require('supervillains');

var mySuperheroName = superheroes.random();
var mySupervillainName = supervillains.random();
console.log(mySuperheroName);
console.log(mySupervillainName);
