var mongoose = require('./node_modules/mongoose');
var db=null;

function connectToMongo()
{
    //connecting to mongodb with mongoose ('mongodb://localhost/[name of the DB]')
    mongoose.connect('mongodb://localhost/Mtest');

    //creating a DB variable that will have the DB in the mongodb
    db = mongoose.connection;

    //if there is an error with the connection print "connection error"
    db.on('error', console.error.bind(console, 'connection error:'));
    //else print "we're connected!"
    db.once('open', function() {
        console.log("we're connected!");
    });
}





module.exports = db;