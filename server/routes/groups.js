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
    players : req.body.players,
    creator : req.user._id,
    creatorName : req.user.username
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
    console.log(req.user);
    if (req.user === undefined){
      res.send("Please Log in!");
    }else{
    var user = req.user._id;

    schema.find({creator : user})
    .then(function(result){
      res.send(result);
    })
    .catch(function(error){
      console.log("Error!", error);
    });
  }
  });

router.post("/players", function(req, res){
    console.log("req.body", req.body);
    console.log("req.user", req.user.username);
    schema.findById(req.body.groupId, function(err, x){
      if(!x){
        return next (new Error("failed"));
      } else {
        console.log("We found", x);
        res.send(x);
      }
    });
});//end playersget

router.put("/", function(req, res){
  var nId = req.body.id;
  console.log(nId);
  var nPlayer = req.body.player;
  console.log(nPlayer);
  console.log("req.body", req.body);
  schema.findById(nId, function(error, p){
    if(!p){
      return next(new Error('Could not load Document'));
    }else{
      console.log("this is ", p.players);
      p.players.push(req.body);
      p.save(function(err) {
      if (err){
        console.log('error');
        res.send("error");
      }else{
        console.log('success');
        res.send("success!");
      }
    });
    }
  });
});

  router.post("/del", function(req, res){
    console.log("Gonna delete", req.body);
    schema.findById(req.body.delGroup, function(err, r){
      if (!r){
        return next(new Error('Could not load Document'));
      } else{
        console.log("hoo we got:", r.players);
        var spliceTarget = r.players;
        spliceTarget.splice(req.body.delNdx, 1);
        r.save(function(err){
          if(err){
            console.log("error in delete");
          }else{
            console.log("delete complete");
            res.send("deleted");
          }
        })

      }
    });
  });

module.exports = router;
