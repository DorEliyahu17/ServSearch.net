"use strict";
var exportMongo=new Object();

//find all arr that change once a week and will be lunch in the beginning of the session
exportMongo.resultArr=[];
var objectId = require('mongodb').ObjectID;
var mongo = require('mongodb').MongoClient;
//var assert = require('assert');

var url = 'mongodb://localhost:27017/Mtest';
//var url = 'mongodb://192.168.1.15:27017/Mtest';

//get the server name from the location field
function getServerFromLocation(location){
    var arr=[];
    arr=location.split(":");
    return arr[0];
}

//find all the collections from the db
exportMongo.findCollectionsNameList = function findCollectionsNameList() {
    var arr=[],i;
    return new Promise(function (resolve, reject) {
        var count=0;
        mongo.connect(url, function (err, db) {
            if(err!=null)
                reject(err);
            //assert.equal(null, err);
            else {
                db.collections().then(function (collections) {
                    for (i = 0; i < collections.length; i++) {
                        if (!((collections[i].s.name == "Admins") || (collections[i].s.name == "Bugs") || (collections[i].s.name == "ToDo"))) {
                            arr[count] = {"name": collections[i].s.name};
                            count++;
                        }
                    }
                    db.close();
                    resolve(arr);
                });
            }
        });
    });
};

//find all the admins from the db
exportMongo.findAll = function findAll(collection) {
    return new Promise(function (resolve, reject) {
        mongo.connect(url, function (err, db) {
            if(err!=null)
                reject(err);
            //assert.equal(null, err);
            else {
                db.collection(collection).find().toArray(function (err, result) {
                    db.close();
                    resolve(result);
                });
            }
        });
    });
};

//find all the bugs from the db
exportMongo.findBugs = function findBugs() {
    return new Promise(function (resolve, reject) {
        mongo.connect(url, function (err, db) {
            if(err!=null)
                reject(err);
            //assert.equal(null, err);
            else {
                db.collection("Bugs").find().toArray(function (err, result) {
                    db.close();
                    resolve(result);
                });
            }
        });
    });
};

//find all the admins from the db
exportMongo.findAdmin = function findAdmin(adminName, adminPassword) {
    return new Promise(function (resolve, reject) {
        mongo.connect(url, function (err, db) {
            if(err!=null)
                reject(err);
            //assert.equal(null, err);
            else {
                db.collection("Admins").find({
                    userName: adminName,
                    password: adminPassword
                }).toArray(function (err, result) {
                    //assert.equal(null, err);
                    //console.log("All admin found"+ results);
                    db.close();
                    resolve([result, adminName, adminPassword]);
                });
            }
        });
    });
};

//find specified document in the db include advance search - find by size range or date range
exportMongo.findSpec = function findSpec(fileName, fileType, server, size, date, sizeRangeLow, sizeRangeHigh, dateRangeLow, dateRangeHigh) {
    //var nameArr = [], name = "", i;
    return new Promise(function (resolve, reject) {
        //if((server!="")||((fileName != "") && (fileType != "") && (server != ""))) {
        if ((server != "") ||
            ((fileName != "") ||
            (fileType != "") ||
            (size!="") ||
            (date!="") ||
            ((sizeRangeLow != "") && (sizeRangeHigh = "")) ||
            ((dateRangeLow != "") && (dateRangeHigh = "")))) {
            mongo.connect(url, function (err, db) {
                if(err!=null)
                    reject(err);
                //assert.equal(null, err);
                else {
                    //1
                    if ((fileName != "") && (fileType != "") && (server != "")) {
                        //advance search without range
                        //1.1.1
                        if ((size != "") && (date != "")) {
                            db.collection(server).find({
                                name: fileName,
                                type: fileType,
                                size: size,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("1.1.1");
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        //1.1.2
                        if ((size != "") && (date == "")) {
                            db.collection(server).find({
                                name: fileName,
                                type: fileType,
                                size: size
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("1.1.2");
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        //1.1.3
                        if ((size == "") && (date != "")) {
                            db.collection(server).find({
                                name: fileName,
                                type: fileType,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("1.1.3");
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        //advance search with range
                        if ((size == "") && (date == "")) {
                            //1.2.1
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    type: fileType,
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lt: sizeRangeHigh
                                    },
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("1.2.1");
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //1.2.2
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    type: fileType,
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("1.2.2");
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //1.2.3
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    type: fileType,
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lt: sizeRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("1.2.3");
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //simple search
                            //1.3
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    type: fileType,
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("1.3");
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                        }
                    }
                    //2
                    if ((fileName != "") && (fileType == "") && (server != "")) {
                        //advance search without range
                        //2.1.1
                        if ((size != "") && (date != "")) {
                            db.collection(server).find({
                                name: fileName,
                                size: size,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("2.1.1");
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        //2.1.2
                        if ((size != "") && (date == "")) {
                            db.collection(server).find({
                                name: fileName,
                                size: size
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("2.1.2");
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        //2.1.3
                        if ((size == "") && (date != "")) {
                            db.collection(server).find({
                                name: fileName,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("2.1.3");
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        //advance search with range
                        if ((size == "") && (date == "")) {
                            //2.2.1
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lt: sizeRangeHigh
                                    },
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("2.2.1");
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //2.2.2
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("2.2.2");
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //2.2.3
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lte: sizeRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("All found everything");
                                    console.log("2.2.3");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //simple search
                            //2.3
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    name: fileName
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("2.3");
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                        }
                    }
                    //3
                    if ((fileName == "") && (fileType != "") && (server != "")) {
                        //advance search without range
                        if ((size != "") && (date != "")) {
                            db.collection(server).find({
                                type: fileType,
                                size: size,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size != "") && (date == "")) {
                            db.collection(server).find({
                                type: fileType,
                                size: size
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size == "") && (date != "")) {
                            db.collection(server).find({
                                type: fileType,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size == "") && (date == "")) {
                            //advance search with range
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    type: fileType,
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lt: sizeRangeHigh
                                    },
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    type: fileType,
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({

                                    type: fileType,
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lt: sizeRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //simple search
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    type: fileType
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                        }
                    }
                    //must to delete?
                    //4
                    if ((fileName == "") && (fileType == "") && (server != "")) {
                        //advance search without range
                        if ((size != "") && (date != "")) {
                            db.collection(server).find({
                                size: size,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size != "") && (date == "")) {
                            db.collection(server).find({
                                size: size
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size == "") && (date != "")) {
                            db.collection(server).find({
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                assert.equal(null, err);
                                //exportMongo.resultArr = results;
                                //exportMongo.resultArr.push(results);
                                //console.log(results);
                                console.log("All found everything");
                                db.close();
                                resolve(results);
                            });
                        }
                        //advance search with range
                        if ((size == "") && (date == "")) {
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lt: sizeRangeHigh
                                    },
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lt: sizeRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //simple search
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find().toArray(function (err, results) {
                                    assert.equal(null, err);
                                    //exportMongo.resultArr = results;
                                    //exportMongo.resultArr.push(results);
                                    //console.log(results);
                                    console.log("All found everything");
                                    db.close();
                                    resolve(results);
                                });
                            }
                        }
                    }
                }
            });
        }
        else
            resolve();
    });
};

//find all the documents in the db
/*exportMongo.findAll = function findAll(){
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
 };*/

//insert one document to the db
exportMongo.insertOne = function insertOne(document, collection){
    return new Promise(function(resolve, reject) {
        mongo.connect(url, function (err, db) {
            //check if the the function didn't return error
            if(err!=null)
                reject(err);
            //assert.equal(null, err);
            else {
                db.collection(collection).insertOne(document, function (err, result) {
                    //check if the the function didn't return error
                    if(err!=null)
                        reject(err);
                    //assert.equal(null, err);
                    else {
                        console.log('Item inserted');
                        db.close();
                        resolve();
                    }
                });
            }
        });
    });
};

//insert arr of documents to the db
exportMongo.insertArr = function insertArr(documents, collection){
    return new Promise(function(resolve, reject) {
        mongo.connect(url, function(err, db) {
            //check if the the function didn't return error
            if(err!=null)
                reject(err);
            //assert.equal(null, err);
            else {
                console.log("documents.length=" + documents.length);
                db.collection(collection).insertMany(documents, function (err, result) {
                    //check if the the function didn't return error
                    if(err!=null)
                        reject(err);
                    //assert.equal(null, err);
                    else {
                        console.log('Arr inserted');
                        db.close();
                        resolve();
                    }
                });
            }
        });
    });
};

//Todo - delete?
//update one document
exportMongo.updateOne = function updateOne(document, collection){
    var id = document.id;

    mongo.connect(url, function(err, db) {
        //check if the the function didn't return error
        if(err!=null)
            reject(err);
        //assert.equal(null, err);
        else {
            db.collection(collection).updateOne({"_id": objectId(id)}, {$set: document}, function (err, result) {
                //check if the the function didn't return error
                if(err!=null)
                    reject(err);
                //assert.equal(null, err);
                else {
                    console.log('Item updated');
                    db.close();
                }
            });
        }
    });
};

//update one document
exportMongo.deleteOne = function deleteOne(documentID, collection){
    return new Promise(function(resolve, reject) {
        mongo.connect(url, function(err, db) {
            //check if the the function didn't return error
            if(err!=null)
                reject(err);
            //assert.equal(null, err);
            else {
                db.collection(collection).deleteOne({"_id": objectId(documentID)}, function (err, result) {
                    //check if the the function didn't return error
                    if(err!=null)
                        reject(err);
                    //assert.equal(null, err);
                    else {
                        console.log('Item deleted');
                        db.close();
                        resolve();
                    }
                });
            }
        });
    });
};

module.exports = exportMongo;