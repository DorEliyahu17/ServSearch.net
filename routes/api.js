var express = require('express');
var router = express.Router();
var mongo=require('../MongoDriver');

/* GET the api home. */
router.get('/', function(req, res, next) {
    var detail="this is the home page of the api of the project. ";
    res.send(detail);
});

/* GET admin home page information. */
router.get('/AH', function(req, res, next) {
    mongo.adminHomeStatus().then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

/* GET files listing. */
router.get('/files', function(req, res, next) {
    mongo.findSpec(req.query.name, req.query.type, req.query.server,
        req.query.size, req.query.date,
        req.query.sizeRangeLow, req.query.sizeRangeHigh,
        req.query.dateRangeLow, req.query.dateRangeHigh
    ).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

/* GET collections name listing. */
router.get('/collections', function(req, res, next) {
    mongo.findCollectionsNameList().then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

/* GET admins name and password listing. */
router.get('/admins', function(req, res, next) {
    mongo.findAdmin(req.query.userName, req.query.password).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

/* GET Bugs listing. */
router.get('/reportedBugs', function(req, res, next) {
    mongo.findAll("Bugs").then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

/* INSERT bug to the database. */
router.get('/insertBug', function(req, res, next) {
    mongo.insertOne({"name":req.query.name, "subject":req.query.subject, "description":req.query.description, "insertDate":req.query.insertDate}, "Bugs").then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

/* DELETE bug from the database. */
router.get('/deleteBugs', function(req, res, next) {
    mongo.deleteArr(req.query._id, "Bugs").then(function(){
        mongo.findAll("Bugs").then(function(result){
            res.send(result);
        }).catch(function(err){
            res.send(err);
        });
    }).catch(function(err){
        res.send(err);
    });
});

/* GET To-DOs listing. */
router.get('/ToDoList', function(req, res, next) {
    mongo.findAll("ToDo").then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

/* INSERT To-Do Item to the database. */
router.get('/insertToDo', function(req, res, next) {
    mongo.insertOne({"description":req.query.description, "insertDate":req.query.insertDate}, "ToDo").then(function(result){
        mongo.findAll("ToDo").then(function(result){
            res.send(result);
        }).catch(function(err){
            res.send(err);
        });
    }).catch(function(err){
        res.send(err);
    });
});

/* DELETE To-Do Item from the database. */
router.get('/deleteToDos', function(req, res, next) {
    mongo.deleteArr(req.query._id, "ToDo").then(function(){
        mongo.findAll("ToDo").then(function(result){
            res.send(result);
        }).catch(function(err){
            res.send(err);
        });
    }).catch(function(err){
        res.send(err);
    });
});

/* GET Scan Results listing. */
router.get('/scanResults', function(req, res, next) {
    mongo.scanReportsSortByYear().then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

module.exports = router;
