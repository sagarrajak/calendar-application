/**
 * Created by SAGAR on 2/24/2017.
 */

var mongoose = require('mongoose');
var express = require('express');
var body_parser = require('body-parser');
var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/story',function(err){
    if(err)
        console.log(err);
    else
        console.log("connected to database");
});


app.use(body_parser.urlencoded());
app.use(body_parser.json());


var eventRoute = require('./app/api')(app,express);
app.use('/api',eventRoute);


app.use(express.static(__dirname));
app.get('*',function(req,res){
    res.sendFile( __dirname + '/app/frontend/template/index.html' );
});


app.listen(3000,function(err){
    if(err)
        console.log(err);
    else
        console.log('server is running');
});