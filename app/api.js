/**
 * Created by SAGAR on 3/2/2017.
 */
var mongoose  = require('mongoose');
var events = require('./schema/details');
module.exports = function(app,express){

    var api = express.Router();

    api.get('/',function(req,res){
        events
            .find({})
            .exec(function(err,out){
                 if(err)
                     res.send(err);
                 else
                     res.send(out);
             });
    });

    api.post('/',function(req,res){

        new events({
           title  : req.body.title,
           startsAt : new Date(req.body.startsAt),
           endsAt : new Date(req.body.endsAt)
        }).save(function(err){
           if(err)
              res.send(err);
           else
            res.status(200).send({'message':'Event added'});
        });

    });

    api.put('/',function(req,res){

        console.log(req.body);

        events
            .findByIdAndUpdate( req.body._id ,
            {
                $set: {
                   title : req.body.title,
                   startsAt : new Date(req.body.startsAt),
                   endsAt : new Date(req.body.endsAt)
            }
            },
            function (err){
                if (err)
                    res.send(err);
                else
                    res.status(200).send({message: 'Query executed successfully!!'});
            }
        )
    });
    api.delete('/:id', function (req,res){
        events.find({
          _id :req.params.id  
        }).remove()
            .exec(function(err){
               if(err)
                res.send(err);
               else
                res.send({"message":"event deleted !!"});
            });
    });

    return api;
}
