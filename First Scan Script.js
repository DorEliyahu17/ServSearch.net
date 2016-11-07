//including shelljs to the project
var shell = require('./node_modules/shelljs');
var mongo=require('./MongoDB');

/*
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

    /
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
     /
}*/

function searchTheHardDrive(searchPath, /*callback*/writeToDB, disconnect)
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
                        fileAndDirObject =new mongo.File(
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

        writeToDB(filesAndDirsObjectArr, function(err){
            disconnect();
        });


        /*
        //insert without arr
        for(i=0;i<filesAndDirsObjectArr.length;i++)
         WriteToDB(filesAndDirsObjectArr[i]);
        console.log(filesAndDirsObjectArr);
        */
    });
}

searchTheHardDrive("C:/Users/Dor/Desktop/stam", mongo.writeToDB, mongo.disconnect);