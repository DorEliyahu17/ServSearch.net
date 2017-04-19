"use strict";
var exportMongo=new Object();
var objectId = require('mongodb').ObjectID;
var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/Mtest';
//var url = 'mongodb://192.168.1.15:27017/Mtest';

//drop collection
exportMongo.dropCollection = function dropCollection(collection){
    return new Promise(function (resolve, reject) {
        mongo.connect(url, function (err, db) {
            if(err!=null)
                reject(err);
            else {
                db.collection(collection).drop(function (err) {
                    db.close();
                    if(err!=null)
                        reject(err);
                    console.log("Collection dropped");
                    resolve();
                });
            }
        });
    });
};

//check DB status
exportMongo.adminHomeStatus = function adminHomeStatus(){
    var bugsNum=-1, TodoNum=-1, scanReportNum=-1;
    return new Promise(function (resolve, reject) {
        mongo.connect(url, function (err, db) {
            if(err!=null)
                reject({"msg":"כבוי","color":"2", "bugsNum":bugsNum, "TodoNum":"-1", "scanReport":scanReportNum});
            else {
                new Promise(function (resolve, reject) {
                    db.collection("Bugs").count({}, function (err, result) {
                        if (err != null)
                            reject();
                        else {
                            bugsNum = result;
                            resolve();
                        }
                    });
                }).then(function(){
                    new Promise(function (resolve, reject) {
                        db.collection("ToDo").count({}, function (err, result) {
                            if(err!=null)
                                reject();
                            else{
                                TodoNum=result;
                                resolve();
                            }
                        })
                    }).then(function(){
                        db.collection("ScanReports").count({}, function (err, result) {
                            if(err!=null)
                                reject();
                            else{
                                scanReportNum=result;
                                resolve({"msg":"פעיל","color":"3", "bugsNum":bugsNum, "TodoNum":TodoNum, "scanReport":scanReportNum});
                            }
                        })
                    })
                        .catch(function(){
                            reject();
                        });
                }).catch(function(){
                    reject({"msg": "כבוי", "color": "2", "bugsNum": bugsNum, "TodoNum": TodoNum, "scanReport":scanReportNum});
                });
            }
        });
    });
};

//find all the collections from the db
exportMongo.findCollectionsNameList = function findCollectionsNameList() {
    var arr=[],i;
    return new Promise(function (resolve, reject) {
        var count=0;
        mongo.connect(url, function (err, db) {
            if(err!=null)
                reject(err);
            else {
                db.collections().then(function (collections) {
                    for (i = 0; i < collections.length; i++) {
                        if (!((collections[i].s.name == "Admins") || (collections[i].s.name == "Bugs") || (collections[i].s.name == "ToDo") || (collections[i].s.name == "ScanReports"))) {
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

//find all the docs from a specified collection from the db
exportMongo.findAll = function findAll(collection) {
    return new Promise(function (resolve, reject) {
        mongo.connect(url, function (err, db) {
            if(err!=null)
                reject(err);
            else {
                db.collection(collection).find().toArray(function (err, result) {
                    db.close();
                    if(err!=null)
                        reject(err);
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

            else {
                db.collection("Admins").find({
                    userName: adminName,
                    password: adminPassword
                }).toArray(function (err, result) {
                    db.close();
                    resolve([result, adminName, adminPassword]);
                });
            }
        });
    });
};

//find specified document in the db include advance search - find by size range or date range
exportMongo.findSpec = function findSpec(fileName, fileType, server, size, date, sizeRangeLow, sizeRangeHigh, dateRangeLow, dateRangeHigh) {
    return new Promise(function (resolve, reject) {
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
                else {
                    //in case all of the simple search filters were filled
                    if ((fileName != "") && (fileType != "") && (server != "")) {
                        //advance search without range
                        if ((size != "") && (date != "")) {
                            db.collection(server).find({
                                name: fileName,
                                type: fileType,
                                size: size,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size != "") && (date == "")) {
                            db.collection(server).find({
                                name: fileName,
                                type: fileType,
                                size: size
                            }).toArray(function (err, results) {
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size == "") && (date != "")) {
                            db.collection(server).find({
                                name: fileName,
                                type: fileType,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                db.close();
                                resolve(results);
                            });
                        }
                        //advance search with range
                        if ((size == "") && (date == "")) {
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
                                    db.close();
                                    resolve(results);
                                });
                            }
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    type: fileType,
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    db.close();
                                    resolve(results);
                                });
                            }
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    type: fileType,
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lt: sizeRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //simple search
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    type: fileType,
                                }).toArray(function (err, results) {
                                    db.close();
                                    resolve(results);
                                });
                            }
                        }
                    }
                    //in case only the file type filter weren't filled
                    if ((fileName != "") && (fileType == "") && (server != "")) {
                        //advance search without range
                        if ((size != "") && (date != "")) {
                            db.collection(server).find({
                                name: fileName,
                                size: size,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size != "") && (date == "")) {
                            db.collection(server).find({
                                name: fileName,
                                size: size
                            }).toArray(function (err, results) {
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size == "") && (date != "")) {
                            db.collection(server).find({
                                name: fileName,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                db.close();
                                resolve(results);
                            });
                        }
                        //advance search with range
                        if ((size == "") && (date == "")) {
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
                                    db.close();
                                    resolve(results);
                                });
                            }
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow != "") && (dateRangeHigh != ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    modifidedDate: {
                                        $gte: dateRangeLow,
                                        $lt: dateRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    db.close();
                                    resolve(results);
                                });
                            }
                            if (((sizeRangeLow != "") && (sizeRangeHigh != "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    name: fileName,
                                    size: {
                                        $gte: sizeRangeLow,
                                        $lte: sizeRangeHigh
                                    }
                                }).toArray(function (err, results) {
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //simple search
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    name: fileName
                                }).toArray(function (err, results) {
                                    db.close();
                                    resolve(results);
                                });
                            }
                        }
                    }
                    //in case only the file name filter weren't filled
                    if ((fileName == "") && (fileType != "") && (server != "")) {
                        //advance search without range
                        if ((size != "") && (date != "")) {
                            db.collection(server).find({
                                type: fileType,
                                size: size,
                                modifidedDate: date
                            }).toArray(function (err, results) {
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size != "") && (date == "")) {
                            db.collection(server).find({
                                type: fileType,
                                size: size
                            }).toArray(function (err, results) {
                                db.close();
                                resolve(results);
                            });
                        }
                        if ((size == "") && (date != "")) {
                            db.collection(server).find({
                                type: fileType,
                                modifidedDate: date
                            }).toArray(function (err, results) {
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
                                    db.close();
                                    resolve(results);
                                });
                            }
                            //simple search
                            if (((sizeRangeLow == "") && (sizeRangeHigh == "")) && ((dateRangeLow == "") && (dateRangeHigh == ""))) {
                                db.collection(server).find({
                                    type: fileType
                                }).toArray(function (err, results) {
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

//insert one document to the db
exportMongo.insertOne = function insertOne(document, collection){
    return new Promise(function(resolve, reject) {
        mongo.connect(url, function (err, db) {
            //check if the the function didn't return error
            if(err!=null)
                reject(err);
            else {
                db.collection(collection).insertOne(document, function (err) {
                    //check if the the function didn't return error
                    if(err!=null)
                        reject(err);
                    else {
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
            else {
                db.collection(collection).insertMany(documents, function (err, result) {
                    //check if the the function didn't return error
                    if(err!=null)
                        reject(err);
                    else {
                        db.close();
                        resolve();
                    }
                });
            }
        });
    });
};

//delete arr
exportMongo.deleteArr = function deleteArr(documentIDArr, collection){
    return new Promise(function(resolve, reject) {
        var i;
        mongo.connect(url, function(err, db) {
            //check if the the function didn't return error
            if(err!=null)
                reject(err);
            else {
                for(i=0;i<(documentIDArr.length-1);i++) {
                    db.collection(collection).deleteOne({"_id": objectId.createFromHexString(documentIDArr[i])}, function (err, result) {
                        //check if the the function didn't return error
                        if (err != null) {
                            if (i > 0) {
                                err.clientMessage="אופס... לא כל הקבצים נמחקו, אנא בדוק את מצב ה DB";
                                reject(err);
                            }
                            else {
                                err.clientMessage="אופס... אף קובץ לא נמחק, אנא בדוק את מצב ה DB";
                                reject(err);
                            }
                        }
                        else
                            db.close();
                    });
                }
                resolve();
            }
        });
    });
};

module.exports = exportMongo;