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

    console.log("name="+req.query.name+", type="+req.query.type+", server="+req.query.server);

    mongo.findSpec(req.query.name, req.query.type, req.query.server).then(function(result){
        if(result!=undefined)
            res.send(result);
        else
            res.send([]);
    });
});

/* GET collections name listing. */
router.get('/collections', function(req, res, next) {
    mongo.findCollectionsNameList().then(function(result){
        res.send(result);
    });
});

/* GET admins name and password listing. */
router.get('/admins', function(req, res, next) {
    mongo.findAdmin(req.query.userName, req.query.password).then(function(result){
        res.send(result);
    });
});

/* GET admins name and password listing. */
router.get('/reportedBugs', function(req, res, next) {
    mongo.findBugs().then(function(result){
        res.send(result);
    });
});

/* GET admins name and password listing. */
router.get('/insertBug', function(req, res, next) {
    //ToDo - change that function
    mongo.findAdmin(req.query.userName, req.query.password).then(function(result){
        res.send(result);
    });
});

/* GET admins name and password listing. */
router.get('/deleteBug', function(req, res, next) {
    //ToDo - change that function
    mongo.findAdmin(req.query.userName, req.query.password).then(function(result){
        res.send(result);
    });
});

/* GET admins name and password listing. */
router.get('/insertToDo', function(req, res, next) {
    //ToDo - change that function
    mongo.findAdmin(req.query.userName, req.query.password).then(function(result){
        res.send(result);
    });
});

/* GET admins name and password listing. */
router.get('/deleteToDo', function(req, res, next) {
    //ToDo - change that function
    mongo.findAdmin(req.query.userName, req.query.password).then(function(result){
        res.send(result);
    });
});

module.exports = router;
