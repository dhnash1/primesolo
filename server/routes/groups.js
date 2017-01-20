var express = require('express');
var router = express.Router();
var path = require('path');

var schema = require('../../models/group');

router.post("/", function(req,res){
  var grip;
  console.log("We got ", req.body);
  schema.create(function(){
  grip = new schema({
    groupName : req.body.groupName,
    players : req.body.players
  });
  grip.save(function(error){
    if (error){
      console.log("error in groupsave!");
    }else{
      res.send(grip);
    }
  }
);
});
});
  router.get("/", function(req, res){
    schema.find()
    .then(function(result){
      res.send(result);
    })
    .catch(function(error){
      console.log("Error!", error);
    });
  });

router.put("/", function(req, res){
  var nId = req.body.id;
  console.log(nId);
  var nPlayer = req.body.player;
  console.log(nPlayer);
  schema.findById(nId, function(error, p){
    if(!p){
      return next(new Error('Could not load Document'));
    }else{
      console.log(p.players);
      p.players.push(nPlayer);
      p.save(function(err) {
      if (err){
        console.log('error');
      }else{
        console.log('success');
      }
    });
    }
  });
});

module.exports = router;
