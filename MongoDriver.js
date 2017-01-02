"use strict";
var exportMongo=new Object();
//var resault=[];
//find all arr that change once a week and will be lunch in the beginning of the session
exportMongo.resultArr=[];
var objectId = require('mongodb').ObjectID;
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/Mtest';

/*
 //disconnect from the db
 exportMongo.disconnect = function disconnect(db){
 db.close();
 };
 */

//get the server name from the location field
function getServerFromLocation(location){
    var arr=[];
    arr=location.split(":");
    return arr[0];
}

//find specified document in the db
exportMongo.findSpec = function findSpec(fileName, fileType, server, callback){
    //exportMongo.resultArr;
    //var resultArray = [];
    var arr=[];

    console.log("fileName="+fileName+", fileType="+fileType+", server="+server);

    mongo.connect(url, function (err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        /*
         var cursor = db.collection('Files').find({"name": "\""+fileName+"\""}/*, {"type": fileType});


         console.log("cursor="+cursor);

         cursor.forEach(function (doc, err) {
         //check if the the function didn't return error
         console.log("err="+err);
         assert.equal(null, err);
         //if((server!="")&&(server.equal(getServerFromLocation(doc.location))))
         console.log("doc="+doc);
         exportMongo.resultArr.push(doc);
         }, function() {
         db.close();
         });
         */
        if((fileName!="")&&(fileType!="")&&(server!="")) {
            db.collection('Files').find({name: fileName}, {type: fileType}, {location: server}).toArray(function (err, results) {
                assert.equal(null, err);
                exportMongo.resultArr = results;
                //exportMongo.resultArr.push(results);
                console.log("All found everything");
                db.close();
                console.log(exportMongo.resultArr);
                callback();
            });
        }
        if ((fileName!="")&&(fileType!="")&&(server=="")) {
            db.collection('Files').find({name: fileName}, {type: fileType}).toArray(function (err, results) {
                assert.equal(null, err);
                exportMongo.resultArr = results;
                //exportMongo.resultArr.push(results);
                console.log("All found no server");
                db.close();
                console.log(exportMongo.resultArr);
                callback();
            });
        }
        if((fileName!="")&&(fileType=="")&&(server!="")){
            db.collection('Files').find({name: fileName}, {location: server}).toArray(function (err, results) {
                assert.equal(null, err);
                exportMongo.resultArr = results;
                //exportMongo.resultArr.push(results);
                console.log("All found no type");
                db.close();
                console.log(exportMongo.resultArr);
                callback();
            });
        }
        if((fileName=="")&&(fileType!="")&&(server!="")){
            db.collection('Files').find({type: fileType}, {location: server}).toArray(function (err, results) {
                assert.equal(null, err);
                exportMongo.resultArr = results;
                //exportMongo.resultArr.push(results);
                console.log("All found no name");
                db.close();
                console.log(exportMongo.resultArr);
                callback();
            });
        }
        if ((fileName!="")&&(fileType=="")&&(server=="")) {
            db.collection('Files').find({name: fileName}).toArray(function (err, results) {
                assert.equal(null, err);
                exportMongo.resultArr = results;
                //exportMongo.resultArr.push(results);
                console.log("All found only name");
                db.close();
                console.log(exportMongo.resultArr);
                callback();
            });
        }
        if((fileName=="")&&(fileType!="")&&(server=="")){
            db.collection('Files').find({type: fileType}).toArray(function (err, results) {
                assert.equal(null, err);
                exportMongo.resultArr = results;
                //exportMongo.resultArr.push(results);
                console.log("All found only type");
                db.close();
                console.log(exportMongo.resultArr);
                callback();
            });
        }
        if((fileName=="")&&(fileType=="")&&(server!="")){
            //var cursor=db.collection('Files').find({location: server});
            //cursor.
            db.collection('Files').find({location: server}).toArray(function (err, results) {
                assert.equal(null, err);
                exportMongo.resultArr = results;
                //exportMongo.resultArr.push(results);
                console.log("All found only server");
                db.close();
                console.log(exportMongo.resultArr);
                callback();
            });
        }
        ///console.log("resultArray[0]="+resultArray[0]);
        //exportMongo.resultArr.push(resultArray);
    });
};


//find all the documents in the db
exportMongo.findAll = function findAll(){
    var resultArray = [];
    mongo.connect(url, function (err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        var cursor = db.collection('Files').find();
        cursor.forEach(function (doc, err) {
            //check if the the function didn't return error
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
        });
        exportMongo.resultArr.push(resultArray);
        console.log("All found");
    });
};

//insert one document to the db
exportMongo.insertOne = function insertOne(document){
    mongo.connect(url, function(err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        db.collection('Files').insertOne(document, function(err, result) {
            //check if the the function didn't return error
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
};




/*
exportMongo.testConnection = function(){
    return new Promise(function(resolve, reject) {
        var connectFlag=false;
        mongo.connect(url, function (err, db) {
            //check if the the function didn't return error
            assert.equal(null, err);
            db.close();
            connectFlag=true;
            //console.log("Connected successfully to the database");
            if(connectFlag)
            resolve();
            //delete after finish
            else
            reject();
        });

    })
};
*/

//insert arr of documents to the db
exportMongo.insertArr = function insertArr(documents){

    return new Promise(function(resolve, reject) {
        mongo.connect(url, function(err, db) {
            //check if the the function didn't return error
            assert.equal(null, err);
            console.log("documents.length="+documents.length);
            db.collection('Files').insertMany(documents, function(err, result) {
                //check if the the function didn't return error
                assert.equal(null, err);
                console.log('Arr inserted');
                db.close();
                resolve();
            });
        });
            //reject();
    });
};

//update one document
exportMongo.updateOne = function updateOne(document){
    var id = document.id;

    mongo.connect(url, function(err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        db.collection('Files').updateOne({"_id": objectId(id)}, {$set: document}, function(err, result) {
            //check if the the function didn't return error
            assert.equal(null, err);
            console.log('Item updated');
            db.close();
        });
    });
};

//update one document
exportMongo.deleteOne = function deleteOne(document){
    var id = document.id;

    mongo.connect(url, function(err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        db.collection('Files').deleteOne({"_id": objectId(id)}, function(err, result) {
            //check if the the function didn't return error
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });
};

module.exports = exportMongo;