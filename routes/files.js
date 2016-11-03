var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();


/* GET files listing. */
router.get('/', function(req, res, next) {
    res.send("Go to api/files to show all the files in the DB");
    /* db.tasks.find(function(err, tasks){
     if(err){
     res.send(err);
     }
     res.json(tasks);
     });*/
});

/* GET files listing. */
router.get('/files', function(req, res, next) {


    res.send({
        _id: "580e850c1946e731c4a30cf6",
        name: "noder",
        type: "Directory",
        size: 0,
        location: "C:/Users/Dor/Desktop/stam/",
        premissions: "rwxr-xr-x",
        createdUser: "Dor",
        group: 197121,
        modifidedDate: "Oct 1 03:15"
    });
    /*
     {
     "_id" : ObjectId("580e850c1946e731c4a30cf3"),
     "modifidedDate" : "Sep 29 14:32",
     "group" : 197121,
     "createdUser" : "Dor",
     "premissions" : "rw-r--r--",
     "location" : "C:/Users/Dor/Desktop/stam/",
     "size" : 262,
     "type" : "txt",
     "name" : "sta1"
     }
     {
     "_id" : ObjectId("580e850c1946e731c4a30cf4"),
     "modifidedDate" : "Sep 29 14:32",
     "group" : 197121,
     "createdUser" : "Dor",
     "premissions" : "rw-r--r--",
     "location" : "C:/Users/Dor/Desktop/stam/",
     "size" : 0,
     "type" : "txt",
     "name" : "sta2"
     }
     {
     "_id" : ObjectId("580e850c1946e731c4a30cf7"),
     "name" : "משו בעברית",
     "type" : "Directory",
     "size" : 0,
     "location" : "C:/Users/Dor/Desktop/stam/noder/",
     "premissions" : "rwxr-xr-x",
     "createdUser" : "Dor",
     "group" : 197121,
     "modifidedDate" : "Oct 1 02:34"
     }
     {
     "_id" : ObjectId("580e850c1946e731c4a30cf5"),
     "modifidedDate" : "Oct 1 02:18",
     "group" : 197121,
     "createdUser" : "Dor",
     "premissions" : "rw-r--r--",
     "location" : "C:/Users/Dor/Desktop/stam/noder/",
     "size" : 0,
     "type" : "txt",
     "name" : "משו בעברית 2"
     }
     /
     "");

     /* db.tasks.find(function(err, tasks){
     if(err){
     res.send(err);
     }
     res.json(tasks);
     });*/
});

module.exports = router;
