var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    groupName : {type : String, required : true},
    players : {type : Array},
    creator : {type : String, required : true},
    creatorName : {type : String, required : true}
});



var Group = mongoose.model('group', groupSchema);
module.exports = Group;
