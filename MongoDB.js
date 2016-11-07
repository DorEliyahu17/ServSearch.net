var mongoose = require('./node_modules/mongoose');

var db;

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

//creating a DB schema (like a table)
db.FileSchema = new mongoose.Schema({
    name: String,
    type: String,
    size: Number,
    location: String,
    premissions: String,
    createdUser: String,
    group: Number,
    modifidedDate: String
},{collection: "Files"});

//model is a object that gives you easy access to name the collection
db.File = mongoose.model('File',db.FileSchema);
//now the FileSchema called File in the DB

db.result="";

db.writeToDB = function WriteToDB(res, callback) {
    //Insert the arr
    db.File.insertMany(res, function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("arr saved");
            callback();
        }
    });
};

db.findAll = function findAll(callback){
    db.File.find({}, function (err, docs) {
        // docs is an array in docs var
        db.res=docs;
        callback();
    });
};

db.disconnect = function Disconnect(){
    //disconnect from the DB
    mongoose.disconnect();
    console.log("Disconnected");
};

db.deleteAll = function deleteAll(callback){
    db.File.remove({}, function(err) {
        console.log('collection removed');
        callback();
    });
};


module.exports = db;