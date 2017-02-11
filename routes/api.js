var express = require('express');
//var File=require('../client/app/file');
var router = express.Router();
var mongo=require('../MongoDriver');

/* GET files listing. */
router.get('/', function(req, res, next) {
    var detail="1. Go to api/files?name=[name of file]&type=[type of the file]&server=[server of the file] to see all the files in the DB. "+
        "2. Go to api/collections to see all the collection names in the DB. "+
        "3. Go to api/admins to see all the admins login in the DB. "+
        "4. Go to api/reportedBugs to see all the bugs that reported in the DB. "+
        "5. api/insertBug?name=[name of the reporter]&subject=[the subject]&description=[the description] insert one bug report to the DB. "+
        "6. api/deleteBug?name=[name of the reporter]&subject=[the subject]&description=[the description] delete one specified bug report from the DB. "+
        "7. api/insertToDo?description=[the description] insert one ToDo item to the DB. "+
        "8. api/deleteToDo?description=[the description] delete one specified ToDo item from the DB. ";
    res.send(detail);
});

/* GET files listing. */
router.get('/files', function(req, res, next) {

    console.log("name="+req.query.name+", type="+req.query.type+", server="+req.query.server+
        ", size="+req.query.size+", date="+req.query.date+
        ", sizeRangeLow="+req.query.sizeRangeLow+", sizeRangeHigh="+req.query.sizeRangeHigh+
        ", dateRangeLow="+req.query.dateRangeLow+", dateRangeHigh="+req.query.dateRangeHigh);

    mongo.findSpec(req.query.name, req.query.type, req.query.server,
        req.query.size, req.query.date,
        req.query.sizeRangeLow, req.query.sizeRangeHigh,
        req.query.dateRangeLow, req.query.dateRangeHigh
    ).then(function(result){
        if(result!=undefined)
            res.send(result);
        else
            res.send([]);
    })
        .catch(function(err){
            res.send(err);
        });
});

/* GET collections name listing. */
router.get('/collections', function(req, res, next) {
    mongo.findCollectionsNameList().then(function(result){
        res.send(result);
    })
        .catch(function(err){
            res.send(err);
        });
});

/* GET admins name and password listing. */
router.get('/admins', function(req, res, next) {
    mongo.findAdmin(req.query.userName, req.query.password).then(function(result){
        res.send(result);
    })
        .catch(function(err){
            res.send(err);
        });
});

/* GET Bugs listing. */
router.get('/reportedBugs', function(req, res, next) {
    mongo.findAll("Bugs").then(function(result){
        res.send(result);
    })
        .catch(function(err){
            res.send(err);
        });
});

/* INSERT bug to the database. */
router.get('/insertBug', function(req, res, next) {
    //ToDo - change that function
    mongo.insertOne({"name":req.query.name, "subject":req.query.subject, "description":req.query.description}, "Bugs").then(function(result){
        res.send(result);
    })
        .catch(function(err){
            res.send(err);
        });
});

/* DELETE bug from the database. */
router.get('/deleteBug', function(req, res, next) {
    //ToDo - change that function
    mongo.deleteOne(req.query.id, "Bugs").then(function(result){
        res.send(result);
    })
        .catch(function(err){
            res.send(err);
        });
});

/* GET To-DOs listing. */
router.get('/ToDoList', function(req, res, next) {
    mongo.findAll("ToDo").then(function(result){
        res.send(result);
    })
        .catch(function(err){
            res.send(err);
        });
});

/* INSERT To-Do Item to the database. */
router.get('/insertToDo', function(req, res, next) {
    //ToDo - change that function
    mongo.insertOne({"description":req.query.description}, "ToDo").then(function(result){
        res.send(result);
    })
        .catch(function(err){
            res.send(err);
        });
});

/* DELETE To-Do Item from the database. */
router.get('/deleteToDo', function(req, res, next) {
    //ToDo - change that function
    mongo.deleteOne(req.query.id, "ToDo").then(function (result) {
        res.send(result);
    })
        .catch(function (err) {
            res.send(err);
        });
});

module.exports = router;
