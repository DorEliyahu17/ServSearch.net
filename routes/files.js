//var mongoose = require('mongoose');
var express = require('express');
//var File=require('../client/app/file');
var router = express.Router();
var mongo=require('../MongoDriver');

mongo.findAll();

/* GET files listing. */
router.get('/', function(req, res, next) {
    res.send("Go to api/files to show all the files in the DB");
});

/* GET files listing. */
router.get('/files', function(req, res, next) {
        res.send(mongo.resultArr);

        /*[{
        _id: "580e850c1946e731c4a30cf6",
        name: "stam 1",
        type: "Directory",
        size: 0,
        location: "C:/Users/Dor/Desktop/stam/",
        permissions: "rwxr-xr-x",
        createdUser: "Dor",
        group: 197121,
        modifidedDate: "Oct 1 03:15"
    },
        {
            _id: "580e850c1946e731c4a30cf6",
            name: "stam 1",
            type: "doc",
            size: 0,
            location: "D:/Users/Dor/Desktop/stam/",
            permissions: "rwxr-xr-x",
            createdUser: "Dor",
            group: 197121,
            modifidedDate: "Oct 1 03:15"
        },
        {
            _id: "580e850c1946e731c4a30cf6",
            name: "stam 3",
            type: "txt",
            size: 0,
            location: "C:/Users/Dor/Desktop/stam/",
            permissions: "rwxr-xr-x",
            createdUser: "Dor",
            group: 197121,
            modifidedDate: "Oct 1 03:15"
        }]);*/

     /* db.tasks.find(function(err, tasks){
     if(err){
     res.send(err);
     }
     res.json(tasks);
     });*/
});

module.exports = router;
