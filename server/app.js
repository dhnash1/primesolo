var express = require('express');
var app = express();
var session = require("express-session");
var bodyparser = require("body-parser");
var mongoose = require('mongoose');
var port = process.env.PORT || 1337;
var path = require("path");

app.listen(port, function(err){
  console.log("listening on 1337");
});
app.use(express.static(path.resolve('./public')));


app.get("/", function(req, res){
  console.log("base url hit");
  res.sendFile( path.resolve( 'public/views/index.html' ) );
});
