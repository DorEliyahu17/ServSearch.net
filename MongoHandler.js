"use strict";

// Retrieve
var mongoClient = require('mongodb').MongoClient;
var assert=require('assert');
var url="mongodb://localhost:27017/Mtest";

var File=require('./client/app/file');

//start of ben lafa code
// var conf = require('../conf');
var promise = require('./node_modules/promise');
var mongoHandler = {};

// var mongoClient = require('mongodb').mongoClient;

mongoHandler.getValuesInCollection = (collection, query) =>{

};

mongoHandler.InsertToCollections = (collectionAndObjects) =>{

    return new promise((resolve, reject) => {
        var allInsertsPromises =[];
        //Connect to the db
        mongoClient.connect(url).then((db)=>{
            var curCol;
            for (var curKey in collectionAndObjects){
                allInsertsPromises.push(db.
                collection(curKey).insert(collectionAndObjects[curKey]));
            }
        })
    })
};

/*
mongoHandler.insertAll=new promise((resolve, reject)=>
{
    mongoClient.connect(url, function (err, db) {
        if (!err) {
            console.log("We are connected");
        }
    })


});

*/
/*
// Connect to the db
mongoClient.connect(url, function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
});
*/




//end of ben lafa code


//start of youtube tutorial code
function getFiles() {
    var resultArray = [];
    mongoClient.connect(url, function (err, db) {
        //check if
        assert.equal(null, err);
        var cursor = db.collection('Files').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            console.log("closed connection");
            //console.log("resultArray youtube code: "+resultArray);
            return resultArray;
        });
    });
}

function insertOne(item){
    mongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('Files').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
}

function updateOne(item){
    var id =item._id;

    mongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('Files').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');
            db.close();
        });
    });
}

function removeOne(item){
    var id = item._id;

    mongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('Files').deleteOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });
}

var Files;
Files=getFiles();
console.log(Files);
//end of youtube tutorial code
