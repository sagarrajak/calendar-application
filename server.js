/**
 * Created by SAGAR on 2/24/2017.
 */

var mongoose = require('mongoose');
var express = require('express');
var body_parser = require('body-parser');
var config = require('../simple_story_app/app/config');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(body_parser.urlencoded());
app.use(body_parser.json());
var eventRoute = require('./app/api')(app,express);
app.use('/api',eventRoute);
app.use(express.static(__dirname));
app.get('*',function(req,res){
    res.sendFile( __dirname + '/app/frontend/template/index.html' );
});
mongoose.connect(config.database,function(err){
    if(err)
        console.log(err);
    else
        console.log("connected to database");
});
server.listen( normalizePort(config.port) ,function(err){
    if(err)
        console.log(err);
    else
        console.log('server is running');
});
server.on('error',onError);


function normalizePort(val){
    var port =  parseInt(val,10);
    if(isNaN(port))
         return val;
    if(port>=0)
         return port;
    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
