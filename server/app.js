//~~~requires~~~//
var express = require('express');
var app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var port = process.env.PORT || 1337;
var path = require("path");
var passport = require("../strategies/userStrat");

//~~~mongoooooo~~//
var mongoURI = "mongodb://localhost:27017/dnd";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('Mongo broke:', err);
});

MongoDB.once('open', function () {
  console.log('Mongo connected');
});


//~~~routes~~~//
var indexroute = require("./routes/index");
var regisroute = require("./routes/register");

//~~~ middlewares~~~//
app.use(bodyParser.json());//json parsing
app.use(express.static(path.resolve('./public')));//public folder
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));//~~~session..?~~~//

//~~~Use that passport~~~//
app.use(passport.initialize());
app.use(passport.session());

//~~~usin routers~~~//
app.use('/', indexroute);
app.use('/regis', regisroute);

app.listen(port, function(err){
  console.log("listening on 1337");
});



app.get("/", function(req, res){
  console.log("base url hit");
  res.sendFile( path.resolve( 'public/views/index.html' ) );
});
