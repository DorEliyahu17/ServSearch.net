var mongoose = require('./node_modules/mongoose');
var modelFlag=true;
var insertFlag=false;
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

function ConnectToDB(model, insert, insertFiles, callback){
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
        if(insert) {
            //console.log("before callback insert");
            callback(insertFiles);
            //console.log("after callback insert")
        }
    });


//now the FileSchema called File in the DB
}

/* callback*/
myMongoClient.writeToDB = function WriteToDB(res1, callback) {
    insertFlag=true;
    ConnectToDB(modelFlag, insertFlag, res1, function(res) {
        db.File.insertMany(res, function (err) {
            if (err) {
                console.log(err);
                return err;
            }
            else {
                console.log("arr saved");
                insertFlag = false;
                //Disconnect();
                callback();
            }
        })
    });
    //Insert the arr
    //need changes
    /*
    db.File.insertMany(res, function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("arr saved");
            //Disconnect();
            callback();
        }
    });*/
};

function insertArr(res,i, callback){
    insertFlag=true;
    ConnectToDB(modelFlag, insertFlag, function(){
        db.File.insertMany(res, function (err) {
            if (err) {
                return err;
            }
            else {
                console.log("arr saved");
                insertFlag=false;
                callback();
                console.log("\n");
            }
        });
    });
}

/*callback*/
myMongoClient.findAll = function FindAll(callback){
    ConnectToDB(modelFlag,insertFlag);
        db.File.find({}, function (err, docs) {
            // docs is an array in docs var
            myMongoClient.res = docs;
            //Disconnect();
            callback();
        });
};

myMongoClient.deleteAll = function DeleteAll(callback){
    ConnectToDB(modelFlag, insertFlag, function(){});
    db.File.remove({}, function(err) {
        console.log('collection removed');
        //Disconnect();
        callback();
    });
};

function FindModel(callback) {
    if(modelFlag) {
        ConnectToDB(modelFlag, insertFlag, null, myMongoClient.disconnect);
        modelFlag = false;
    }
    callback();
}

FindModel(function (){
    module.exports = myMongoClient;
});