/**
 * Created by SAGAR on 3/2/2017.
 */

var  mongoose = require('mongoose');
var  Schema  = mongoose.Schema;
var  details =   new  Schema({
     title  : { type : String,require:true},
     startsAt : { type : Date  , require : true },
     endsAt   : { type :Date  , require : true }
});
module.exports = mongoose.model( 'events',details);





