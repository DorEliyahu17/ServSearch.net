//including shelljs to the project
var shell = require('./node_modules/shelljs');

//including mongoose to the project
var mongoose = require('./node_modules/mongoose');

//connecting to mongodb with mongoose ('mongodb://localhost/[name of the DB]')
mongoose.connect('mongodb://localhost/Mtest');

//creating a DB variable that will have the DB in the mongodb
var db = mongoose.connection;
//if there is an error with the connection print "connection error"
db.on('error', console.error.bind(console, 'connection error:'));
//else print "we're connected!"
db.once('open', function() {
    console.log("we're connected!");
});

//creating a DB schema (like a table)
var FileSchema = new mongoose.Schema({
    name: String,
    type: String,
    size: Number,
    location: String,
    premissions: String,
    createdUser: String,
    group: Number,
    modifidedDate: String
},{collection: "Files"});

//model is a object that gives you easy access to name the collection
var File = mongoose.model('File',FileSchema);
//now the FileSchema called File in the DB


function WriteToDB(res, callback)
{
    //Insert the arr
    File.insertMany(res, function(err) {
        if (err) {
            return err;
        }
        else{
            console.log("arr saved");
            callback();
        }
    });



    /*
     //without arr
     var data=new File(res);
     //console.log(data);
     data.save(function (err) {
     if (err) {
     return err;
     }
     else{
     console.log("Post saved");
     }
     });
     //console.log(data.name + " saved");
     */
}

function searchTheHardDrive(searchPath, /*callback*/WriteToDB)
{
//do the command is in the shell
    shell.exec('ls -l -R ' + searchPath + ' | grep -v .lnk | tr -s " "', {silent: true}, function (a, resault) {
        var i,
            resVar, //Resault var
            dirArr, //Directories arr
            dirIndex, //Directory index
            filesArr, //Files arr
            filesIndex, //File index
            fileDetails, //File Details arr
            path = "", //The path var
            fileNameAndType=[], //File name and type arr
            fileAndDirObject = {}, //File and directory object
            filesAndDirsObjectArr = [], //File and directories object arr
            tempName="";

        resVar = resault;
        dirArr = resVar.split(searchPath);

        //for loop on the directory arr - fix from here
        for (dirIndex = 1; dirIndex < dirArr.length; dirIndex++) {
            filesArr = dirArr[dirIndex].split("\n");

            //for loop on the files in the directory
            for (filesIndex = 0; filesIndex < filesArr.length - 2; filesIndex++) {
                //update the path of this father directory
                if (filesIndex == 0) {
                    filesArr[filesIndex] = filesArr[filesIndex].replace(/:/g, "/");
                    //filesArr[filesIndex] = filesArr[filesIndex].replace(/\//g, "\\");
                    path = searchPath + filesArr[filesIndex];
                }

                //update the file details
                else if (filesIndex != 1) {
                    fileNameAndType = "";
                    fileAndDirObject = "";
                    tempName = "";
                    //cut the files details and store it in object
                    fileDetails = filesArr[filesIndex].split(" ");
                    for(i=8;i<fileDetails.length;i++)
                        tempName += fileDetails[i] + " ";
                    tempName=tempName.slice(0,tempName.length-1);
                    //if this is a directory
                    if (fileDetails[0].charAt(0) == "d") {
                        fileAndDirObject =
                        {
                            name: tempName,
                            type: 'Directory',
                            size: parseInt(fileDetails[4]),
                            location: path,
                            premissions: fileDetails[0].slice(1),
                            createdUser: fileDetails[2],
                            group: fileDetails[3],
                            modifidedDate: fileDetails[5] + " " + fileDetails[6] + " " + fileDetails[7]
                        };
                        filesAndDirsObjectArr.push(fileAndDirObject);
                    }
                    else {
                        fileNameAndType = tempName.split(".");
                        fileAndDirObject =new File(
                            {
                                name: fileNameAndType[0],
                                type: fileNameAndType[1],
                                size: parseInt(fileDetails[4]),
                                location: path,
                                premissions: fileDetails[0].slice(1),
                                createdUser: fileDetails[2],
                                group: fileDetails[3],
                                modifidedDate: fileDetails[5] + " " + fileDetails[6] + " " + fileDetails[7]

                            });
                        filesAndDirsObjectArr.push(fileAndDirObject);
                    }
                }
            }
        }

        WriteToDB(filesAndDirsObjectArr, function(err){
            //disconnect from the DB
            mongoose.disconnect();
            console.log("Disconnected");
            console.log("Done");
        });

        /*
        //insert without arr
        for(i=0;i<filesAndDirsObjectArr.length;i++)
         WriteToDB(filesAndDirsObjectArr[i]);
        console.log(filesAndDirsObjectArr);
        */
    });
}

searchTheHardDrive("C:/Users/Dor/Desktop/stam", WriteToDB);


