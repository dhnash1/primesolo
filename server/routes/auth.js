var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res){
  if(req.isAuthenticated()){
    var user = req.user;
    res.send(user);
  } else {
    res.send(undefined);
  }
});

module.exports = router;
