var express = require('express');
//var File=require('../client/app/file');
var router = express.Router();
var mongo=require('../MongoDriver');

/* GET files listing. */
router.get('/', function(req, res, next) {
    res.send("Go to api/files?name=[name of file]&type=[type of the file]&server=[server of the file] to show all the files in the DB");
});

/* GET files listing. */
router.get('/files', function(req, res, next) {

    console.log("name="+req.query.name+", type="+req.query.type+", server="+req.query.server);

   mongo.findSpec(req.query.name, req.query.type, req.query.server, function(){
       console.log("inside")
       res.send(mongo.resultArr);
       });

});

module.exports = router;
