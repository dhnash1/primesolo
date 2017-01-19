var express = require('express');
var router = express.Router();
var path = require('path');

var schemo = require('../../models/user');


router.post('/', function(req, res){
  console.log("somethings here!");
  console.log("req.body: ", req.body);

  schemo.create(req.body, function(error, res){
    if (error) {
      console.log("Error in register: ", error);
    }else{
      console.log("created!");
    }

  });
});

module.exports = router;
