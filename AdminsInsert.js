//including shelljs and my MongoDB client to the script
var shell = require('./node_modules/shelljs');
var mongo = require('./MongoDriver');

var i;
var fileLog= shell.cat('admin.log.txt');
var admins=fileLog.split("\r\n");
var adminfile=[];
var adminsToInsert=[];
var allInsertPromises = [];

for(i=0;i<admins.length;i++) {
    adminfile=admins[i].split(" ");
    var admin={
        userName:adminfile[0],
        password:adminfile[1]
    };
    allInsertPromises.push(mongo.findAdmin(admin.userName, admin.password));
}
Promise.all(allInsertPromises).then((data)=> {
    for(i=0;i<data.length;i++) {
        if(data[i][0]=="") {
            var admin = {
                userName: data[i][1],
                password: data[i][2]
            };
            adminsToInsert.push(admin);
        }
    }
    if(adminsToInsert.length>0)
        mongo.insertArr(adminsToInsert, "Admins");
    console.log("done");
});