//"use strict";
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

//insert arr of documents to the db
exportMongo.insertArr = function insertArr(documents){
    mongo.connect(url, function(err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        db.collection('Files').insertMany(documents, function(err, result) {
            //check if the the function didn't return error
            assert.equal(null, err);
            console.log('Arr inserted');
            db.close();
        });
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