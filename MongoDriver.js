"use strict";
var exportMongo;
var objectId = require('mongodb').ObjectID;
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/Mtest';

//disconnect from the db
exportMongo.disconnect = function disconnect(db){
    db.close();
};

//find all the documents in the db
exportMongo.findAll = function findAll(callback){
    var resultArray = [];
    mongo.connect(url, function (err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        var cursor = db.collection('Files').find();
        cursor.forEach(function (doc, err) {
            //check if the the function didn't return error
            assert.equal(null, err);
            resultArray.push(doc);
        });
        callback(db);
    });
};

//insert one document to the db
exportMongo.insertOne = function insertOne(document, callback){
    mongo.connect(url, function(err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        db.collection('Files').insertOne(document, function(err, result) {
            //check if the the function didn't return error
            assert.equal(null, err);
            console.log('Item inserted');
            callback(db);
        });
    });

};

//update one document
exportMongo.updateOne = function updateOne(document, callback){
    var id = document.id;

    mongo.connect(url, function(err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        db.collection('Files').updateOne({"_id": objectId(id)}, {$set: document}, function(err, result) {
            //check if the the function didn't return error
            assert.equal(null, err);
            console.log('Item updated');
            callback(db);
        });
    });
};

//update one document
exportMongo.deleteOne = function deleteOne(document, callback){
    var id = document.id;

    mongo.connect(url, function(err, db) {
        //check if the the function didn't return error
        assert.equal(null, err);
        db.collection('Files').deleteOne({"_id": objectId(id)}, function(err, result) {
            //check if the the function didn't return error
            assert.equal(null, err);
            console.log('Item deleted');
            callback(db);
        });
    });
};

module.exports = exportMongo;