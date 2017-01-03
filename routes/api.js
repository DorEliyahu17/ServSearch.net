var express = require('express');
//var File=require('../client/app/file');
var router = express.Router();
var mongo=require('../MongoDriver');

/* GET files listing. */
router.get('/', function(req, res, next) {
    res.send("Go to api/files?name=[name of file]&type=[type of the file]&server=[server of the file] to see all the files in the DB or "+
        "go to api/collections to see all the collection names in the DB.");
});

/* GET files listing. */
router.get('/files', function(req, res, next) {

    console.log("name="+req.query.name+", type="+req.query.type+", server="+req.query.server);

    mongo.findSpec(req.query.name, req.query.type, req.query.server).then(function(result){
        if(result!=undefined)
            res.send(result);
        else {
            res.send([]);
            console.log("result then="+result);
        }

    });
});

/* GET collections name listing. */
router.get('/collections', function(req, res, next) {
    mongo.findCollectionsNameList().then(function(result){
        res.send(result);
    });
});

module.exports = router;
