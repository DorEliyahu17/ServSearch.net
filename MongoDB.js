var mongoose = require('./node_modules/mongoose');
var modelFlag=true;
//var FileModel;
var myMongoClient={};
myMongoClient.Model;
var db;
/*var FileModel="";*/

function ConnectToDB(model, callback){
//connecting to mongodb with mongoose ('mongodb://localhost/[name of the DB]')
   db = mongoose.connect('mongodb://localhost/Mtest');

//creating a DB variable that will have the DB in the mongodb
    db = mongoose.connection;

//if there is an error with the connection print "connection error"
    db.on('error', console.error.bind(console, 'connection error:'));
//else print "we're connected!"
    db.once('open', function () {
        console.log("we're connected!");
    });

//creating a DB schema (like a table)
    db.FileSchema = new mongoose.Schema({
        name: String,
        type: String,
        size: Number,
        location: String,
        permissions: String,
        createdUser: String,
        group: Number,
        modifidedDate: String
    }, {collection: "Files"});

//model is a object that gives you easy access to name the collection
    if(model) {
        db.File = mongoose.model('File', db.FileSchema);
        myMongoClient.Model = mongoose.model('File', db.FileSchema);
        callback();
    }
//now the FileSchema called File in the DB
}
//db.result="";

/*, callback*/
myMongoClient.writeToDB = function WriteToDB(res, callback) {
    ConnectToDB(modelFlag, function(){});
    //Insert the arr
    db.File.insertMany(res, function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("arr saved");
            //Disconnect();
            callback();
        }
    });
};
/*callback*/
myMongoClient.findAll = function FindAll(callback){
    ConnectToDB(modelFlag, function(){});
    db.File.find({}, function (err, docs) {
        // docs is an array in docs var
        db.res=docs;
        //Disconnect();
        callback();
    });
};

myMongoClient.disconnect = function Disconnect(){
    //disconnect from the DB
    mongoose.disconnect();
    console.log("Disconnected");
};

myMongoClient.deleteAll = function DeleteAll(callback){
    ConnectToDB(modelFlag, function(){});
    db.File.remove({}, function(err) {
        console.log('collection removed');
        //Disconnect();
        callback();
    });
};

function FindModel(callback1/*disconnect*/, callback2) {
    ConnectToDB(modelFlag, callback1);
    callback2();
}

FindModel(function (){
    //disconnect from the DB
    mongoose.disconnect();
    console.log("Disconnected");
    modelFlag = false;
}, function (){
    module.exports = myMongoClient;
    //console.log("FileModel="+myMongoClient.Model);
});