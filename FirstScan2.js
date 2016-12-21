//including shelljs and my MongoDB client to the script
var shell = require('./node_modules/shelljs');
var mongo = require('./MongoDriver');
//var file = require("./client/app/file");

//Timer parameters
var minutes = 0;
var seconds = 0;
var totalSeconds = 0;


/*recursivePromise=new Promise(function(searchPath, count, writeToDB, disconnect){
 console.log("O.K");
 });*/


//the "main" function
function searchTheEntireHardDrive(searchPath, count, writeToDB, disconnect)
{

    /*new Promise(function(searchPath, count, writeToDB, disconnect){
     console.log("O.K");
     });*/

    //do the command is in the shell
    shell.exec('ls -l -R ' + searchPath + ' | grep -v .lnk | tr -s " "', {silent: true}, function (err, resault){
        console.log("After "+minutes+":"+seconds+" this scan was completed");
        console.log("now just wait to the insert.");
        var i,
            j,
            path,
            filesArr,
            dirCheck=[],
            res,
            fileNameAndType=[], //File name and type arr.
            //fileAndDirObject have to has new method
            //fileAndDirObject={}, //File and directory object
            filesAndDirsObjectArr = [], //File and directories object arr
            ArrOfDirs =[],
            tempDirName=[],
            tempName="";
        res=resault;
        filesArr=res.split("\n");
        path = searchPath;
        for(i=0;i<(filesArr.length-1);i++) {
            if (!((filesArr[i][0] == searchPath[0]) || (filesArr[i][0] == "t") || (filesArr[i] == ""))) {
                dirCheck = filesArr[i].split(" ");
                //console.log("filesArr[" + i + "] = " + filesArr[i]);

                tempName = dirCheck[8];
                for (j = 9; j < dirCheck.length; j++) {
                    if (j == (dirCheck.length - 1))
                        tempName += " " + dirCheck[j];
                    else
                        tempName += dirCheck[j] + " ";
                }
                if (dirCheck[0].charAt(0) == 'd') {
                    /*if (dirCheck.length == 9)


                        console.log(path);
                        //path += tempName + "/";
*/
                    //if this is a directory create a model and push it to the arr
                    if (dirCheck[0].charAt(0) == "d") {
                        //fileAndDirObject init
                        //fileAndDirObject = new file();/*mongo.Model*/
                        var fileAndDirObject = {
                            name: tempName,
                            type: 'Directory',
                            size: parseInt(dirCheck[4]), //everything will be in bytes and in the code it will be converted to kilo or mega bytes
                            location: path,
                            permissions: dirCheck[0].slice(1),
                            createdUser: dirCheck[2],
                            group: dirCheck[3],
                            modifiedDate: dirCheck[5] + " " + dirCheck[6] + " " + dirCheck[7]
                        };

                        ArrOfDirs.push(fileAndDirObject);
                        filesAndDirsObjectArr.push(fileAndDirObject);
                        //console.log("file name and dir that pushed: \n" + fileAndDirObject.name, fileAndDirObject.type)
                    }

                    //searchTheEntireHardDrive(path, ++count, writeToDB, disconnect);
                    //searchThedir(path, writeToDB, disconnect, count++);
                }
                else {
                    fileNameAndType = tempName.split(".");
                    if (fileNameAndType[1] == undefined)
                        fileNameAndType.push("");

                    //fileAndDirObject init
                    //fileAndDirObject = file;/*mongo.Model*/
                    var fileAndDirObject = {
                        name: fileNameAndType[0],
                        type: fileNameAndType[1],
                        size: parseInt(dirCheck[4]), //everything will be in bytes and in the code it will be converted to kilo or mega bytes
                        location: path,
                        permissions: dirCheck[0].slice(1),
                        createdUser: dirCheck[2],
                        group: dirCheck[3],
                        modifiedDate: dirCheck[5] + " " + dirCheck[6] + " " + dirCheck[7]
                    };

                    filesAndDirsObjectArr.push(fileAndDirObject);
                    //console.log("file name and dir that pushed: \n" + fileAndDirObject.name, fileAndDirObject.type)
                }
            }
            else
            {
                if(filesArr[i][0] == searchPath[0])
                {
                    tempDirName=filesArr[i].split(":");
                    path=tempDirName[0]+":"+tempDirName[1];
                }
            }
        }
        if (filesAndDirsObjectArr.length != 0)
            writeToDB(filesAndDirsObjectArr, function () {
                console.log("After " + minutes + ":" + seconds + " this scan was inserted to the mongo");
            });
    });
}

//Timer class
function setTime()
{
    ++totalSeconds;
    seconds = pad(totalSeconds%60);
    minutes = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}

//calculate the size of an object
function memorySizeOf(obj) {
    var bytes = 0;
    function sizeOf(obj) {
        if(obj !== null && obj !== undefined) {
            switch(typeof obj) {
                case 'number':
                    bytes += 8;
                    break;
                case 'string':
                    bytes += obj.length * 2;
                    break;
                case 'boolean':
                    bytes += 4;
                    break;
                case 'object':
                    var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                    if(objClass === 'Object' || objClass === 'Array') {
                        for(var key in obj) {
                            if(!obj.hasOwnProperty(key)) continue;
                            sizeOf(obj[key]);
                        }
                    } else bytes += obj.toString().length * 2;
                    break;
            }
        }
        return bytes;
    }

    function formatByteSize(bytes) {
        if(bytes < 1024) return bytes + " bytes";
        else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
        else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
        else return(bytes / 1073741824).toFixed(3) + " GB";
    }
    return formatByteSize(sizeOf(obj));
}


setInterval(setTime, 1000);
//if(mongo.testConnection==1)
console.log("Scan started please wait.");
searchTheEntireHardDrive("C:/Users/Dor/Desktop/stam", 0, mongo.insertArr);
/*else {
 console.log("Open the database and restart the script");
 clearInterval(setTime);
 }*/

//Users/Dor/Desktop/stam