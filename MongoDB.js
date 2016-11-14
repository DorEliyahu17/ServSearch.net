var mongoose = require('./node_modules/mongoose');
var modelFlag=true;
//var FileModel;
var myMongoClient={};
myMongoClient.Model;
myMongoClient.res;
var db;

myMongoClient.disconnect = function Disconnect(){
    //disconnect from the DB
    mongoose.disconnect();
    console.log("Disconnected");
};

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

        if(model) {
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

            db.File = mongoose.model('File', db.FileSchema);
            myMongoClient.Model = mongoose.model('File', db.FileSchema);
            myMongoClient.disconnect();
        }
    });


//now the FileSchema called File in the DB
}

/* callback*/
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
    ConnectToDB(modelFlag);
    //if(myMongoClient.Model!=undefined) {
        db.File.find({}, function (err, docs) {
            // docs is an array in docs var
            myMongoClient.res = docs;
            //Disconnect();
            callback();
        });
    /*}
    else*/
};

myMongoClient.deleteAll = function DeleteAll(callback){
    ConnectToDB(modelFlag, function(){});
    db.File.remove({}, function(err) {
        console.log('collection removed');
        //Disconnect();
        callback();
    });
};

function FindModel(callback) {
    if(modelFlag) {
        ConnectToDB(modelFlag, myMongoClient.disconnect);
        modelFlag = false;
    }
    callback();
}

FindModel(function (){
    module.exports = myMongoClient;
});