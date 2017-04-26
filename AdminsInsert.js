//including shelljs and my MongoDriver to the script
var shell = require('./node_modules/shelljs');
var mongo = require('./MongoDriver');

var i, adminfile=[], adminsToInsert=[];
var fileLog= shell.cat('admin.log.txt');
var admins=fileLog.split("\r\n");

mongo.findAdminCollection()
    .then(() => {
        mongo.dropCollection("Admins")
        //if Admins collection has already created
            .then(() => {
                for (i = 0; i < admins.length; i++) {
                    adminfile = admins[i].split(" ");
                    var admin = {
                        userName: adminfile[0],
                        password: adminfile[1]
                    };
                    adminsToInsert.push(admin);
                }
                mongo.insertArr(adminsToInsert, "Admins")
                    .then(() => {
                        console.log("Collection created successfully");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            //if Admins collection not created
            .catch(() => {
                for (i = 0; i < admins.length; i++) {
                    adminfile = admins[i].split(" ");
                    var admin = {
                        userName: adminfile[0],
                        password: adminfile[1]
                    };
                    adminsToInsert.push(admin);
                }
                mongo.insertArr(adminsToInsert, "Admins")
                    .then(() => {
                        console.log("Collection created successfully");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
    })
    .catch((err) => {
        console.log(err);
    });