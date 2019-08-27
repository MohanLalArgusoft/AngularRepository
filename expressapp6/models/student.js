var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    rollno:{type:String,require:true},
    studentname:{type:String,require:true},
    age:{type:String,require:true},
    total:{type:String,require:true},
    creation_dt:{type:Date,require:true}
});


module.exports = mongoose.model('Student',schema);