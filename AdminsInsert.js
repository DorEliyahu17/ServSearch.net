//including shelljs and my MongoDB client to the script
var shell = require('./node_modules/shelljs');
var mongo = require('./MongoDriver');

var i;
var fileLog= shell.cat('admin.log.txt');
var admins=fileLog.split("\r\n");
var adminfile=[];
for(i=0;i<admins.length;i++) {
    adminfile=admins[i].split(" ");
    var admin={
        userName:adminfile[0],
        password:adminfile[1]
    };
    mongo.insertOne(admin,"Admins").then(function(){
        console.log("New admin inserted successfully!");
    });
}