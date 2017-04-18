//including shelljs and my MongoDB client to the script
var shell = require('./node_modules/shelljs');
var mongo = require('./MongoDriver');

//Timer parameters
var minutes = 0;
var seconds = 0;
var totalSeconds = 0;

//the "main" function
function searchTheEntireHardDrive(searchPath, writeToDB) {
    var allInsertPromises = [];

    //do the command is in the shell
    //1024 bytes = 1 KB = 65,436 chars in resault = 1,408 lines = estimated 934 files
    //1024 bytes * 1024 = 1048576 = 1 MB = 1,048,576 chars in resault
    shell.exec('ls -l -R ' + searchPath + ' | grep -v .lnk | tr -s " "', {
        silent: true,
        maxBuffer: (1024 * 1024) * 1024
    }, function (err, result) {
        var i,
            j,
            currentDate = new Date().toJSON().slice(0, 10).split('-'),
            scanCount = 1,
            documentCount = 0,
            dirCount = 0,
            fileCount = 0,
            stopTime,
            collection = searchPath[0],
            path,
            date,
            filesArr,
            dirCheck = [],
            fileNameAndType = [], //File name and type arr.
            filesAndDirsObjectArr = [], //File and directories object arr
            ArrOfDirs = [],
            tempDirName = [],
            tempName = "",
            ScanDetail = {},
            fileAndDirObject;

        if ((seconds == 0) && (minutes == 0))
            stopTime = "0" + minutes + ":" + "0" + seconds;
        else
            stopTime = minutes + ":" + seconds;
        console.log("After " + stopTime + " this scan was completed");
        console.log("now just wait to the insert.");

        //res = resault;
        filesArr = result.split("\n");
        console.log("Total number of scanned docs=" + filesArr.length);
        path = searchPath;
        for (i = 0; i < (filesArr.length - 1); i++) {
            scanCount++;
            //if it is a file row
            if (!((filesArr[i][0] == searchPath[0]) || (filesArr[i][0] == "t") || (filesArr[i] == ""))) {
                documentCount++;
                dirCheck = filesArr[i].split(" ");
                //date fixer
                switch (dirCheck[5]) {
                    case "Jan":
                        date = 1;
                        break;
                    case "Feb":
                        date = 2;
                        break;
                    case "Mar":
                        date = 3;
                        break;
                    case "Apr":
                        date = 4;
                        break;
                    case "May":
                        date = 5;
                        break;
                    case "Jun":
                        date = 6;
                        break;
                    case "Jul":
                        date = 7;
                        break;
                    case "Aug":
                        date = 8;
                        break;
                    case "Sep":
                        date = 9;
                        break;
                    case "Oct":
                        date = 10;
                        break;
                    case "Nov":
                        date = 11;
                        break;
                    case "Dec":
                        date = 12;
                        break;
                }
                if (dirCheck[7].indexOf(":") == -1) {
                    if (dirCheck[6] < 10) {
                        if (date < 10)
                            date = "0" + dirCheck[6] + "/0" + date + "/" + dirCheck[7];
                        else
                            date = "0" + dirCheck[6] + "/" + date + "/" + dirCheck[7];
                    }
                    else {
                        if (date < 10)
                            date = dirCheck[6] + "/0" + date + "/" + dirCheck[7];
                        else
                            date = dirCheck[6] + "/" + date + "/" + dirCheck[7];
                    }
                }
                else {
                    if ((currentDate[1] >= 7) && (currentDate[1] <= 12)) {
                        if (dirCheck[6] < 10)
                            date = "0" + dirCheck[6] + "/" + date + "/" + currentDate[0];
                        else
                            date = dirCheck[6] + "/" + date + "/" + currentDate[0];
                    }
                    else {
                        if ((currentDate[1] <= date) && (date >= 7)) {
                            if (dirCheck[6] < 10) {
                                if (date < 10)
                                    date = "0" + dirCheck[6] + "/0" + date + "/" + (currentDate[0] - 1);
                                else
                                    date = "0" + dirCheck[6] + "/" + date + "/" + (currentDate[0] - 1);
                            }
                            else {
                                if (date < 10)
                                    date = dirCheck[6] + "/0" + date + "/" + (currentDate[0] - 1);
                                else
                                    date = dirCheck[6] + "/" + date + "/" + (currentDate[0] - 1);
                            }
                        }
                        else {
                            if ((currentDate[1] >= date) && (date <= 7)) {
                                if (dirCheck[6] < 10)
                                    date = "0" + dirCheck[6] + "/0" + date + "/" + currentDate[0];
                                else
                                    date = dirCheck[6] + "/0" + date + "/" + currentDate[0];
                            }
                        }
                    }
                }
                tempName = dirCheck[8];
                for (j = 9; j < dirCheck.length; j++)
                    tempName += " " + dirCheck[j];
                if (dirCheck[0].charAt(0) == 'd') {
                    //if this is a directory create a model and push it to the arr
                    if (dirCheck[0].charAt(0) == "d") {
                        dirCount++;
                        fileAndDirObject = {
                            name: tempName,
                            type: 'Directory',
                            size: dirCheck[4], //everything will be in bytes and in the code it will be converted to kilo or mega bytes
                            location: path,
                            //permissions: dirCheck[0].slice(1),
                            createdUser: dirCheck[2],
                            group: dirCheck[3],
                            modifiedDate: date
                        };
                        ArrOfDirs.push(fileAndDirObject);
                        //if the arr is more than 16MB insert it to the DB and clean it
                        if (filesAndDirsObjectArr.length == 297726) {
                            allInsertPromises.push(writeToDB(filesAndDirsObjectArr, collection));
                            filesAndDirsObjectArr = [];
                        }
                        filesAndDirsObjectArr.push(fileAndDirObject);
                    }
                }
                else {
                    fileCount++;
                    fileNameAndType = tempName.split(".");
                    if (fileNameAndType[1] == undefined)
                        fileNameAndType.push("אין סוג לקובץ");
                    if (fileNameAndType.length > 2) {
                        for (j = 0; j < fileNameAndType.length - 1; j++)
                            fileNameAndType[0] += fileNameAndType[j];
                        fileNameAndType[1] = fileNameAndType[(fileNameAndType.length - 1)]
                    }
                    fileAndDirObject = {
                        name: fileNameAndType[0],
                        type: fileNameAndType[1],
                        size: dirCheck[4], //everything will be in bytes and in the code it will be converted to kilo or mega bytes
                        location: path,
                        //permissions: dirCheck[0].slice(1),
                        createdUser: dirCheck[2],
                        group: dirCheck[3],
                        modifiedDate: date
                    };
                    //if the arr is more than 16MB insert it to the DB and clean it
                    if (filesAndDirsObjectArr.length == 297726) {
                        allInsertPromises.push(writeToDB(filesAndDirsObjectArr, collection));
                        filesAndDirsObjectArr = [];
                    }
                    filesAndDirsObjectArr.push(fileAndDirObject);
                }
            }
            else {
                if (filesArr[i][0] == searchPath[0]) {
                    tempDirName = filesArr[i].split(":");
                    path = tempDirName[0] + ":" + tempDirName[1];
                }
            }
        }

        //if the arr is more than 16MB insert it to the DB and clean it
        if ((filesAndDirsObjectArr.length <= 297726) && (filesAndDirsObjectArr.length > 0)) {
            allInsertPromises.push(writeToDB(filesAndDirsObjectArr, collection));
            filesAndDirsObjectArr = [];
        }

        //after all of the inserts finished
        Promise.all(allInsertPromises).then(() => {
            if ((seconds == 0) && (minutes == 0))
                stopTime = "0" + minutes + ":" + "0" + seconds;
            else
                stopTime = minutes + ":" + seconds;
            console.log("After " + stopTime + " this scan was inserted to the DB to the collection: " + collection + ".");
            new Promise(function (resolve, reject) {
                ScanDetail = {
                    "date": currentDate[2] + "." + currentDate[1] + "." + currentDate[0],
                    "status": "Successful",
                    "scanTime": stopTime,
                    "scanPath": searchPath,
                    "collection": collection,
                    "totalScannedNumber": scanCount,
                    "documentsNumber": documentCount,
                    "directoriesNumber": dirCount,
                    "filesNumber": fileCount
                };
                mongo.insertOne(ScanDetail, "ScanReports").then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                })
            })
                //in case everything was good
                .then(() => {
                    if ((seconds == 0) && (minutes == 0))
                        stopTime = "0" + minutes + ":" + "0" + seconds;
                    else
                        stopTime = minutes + ":" + seconds;
                    clearInterval(setTime);
                    console.log("After " + stopTime + " the scan detail was inserted to the DB.");
                    process.exit(-1);
                })
                //in case that the scan detail wasn't inserted to the database
                .catch((err) => {
                    if ((seconds == 0) && (minutes == 0))
                        stopTime = "0" + minutes + ":" + "0" + seconds;
                    else
                        stopTime = minutes + ":" + seconds;
                    clearInterval(setTime);
                    console.log("After " + stopTime + " the scan detail wasn't inserted and returned with an error:\n" + err);
                    console.log("please fix it and start again the scan!");
                    process.exit(-1);
                })
        })
            //in case the scan couldn't inserted to the database
            .catch((err) => {
            if ((seconds == 0) && (minutes == 0))
                stopTime = "0" + minutes + ":" + "0" + seconds;
            else
                stopTime = minutes + ":" + seconds;
            console.log("After " + stopTime + " this scan returned with an error:\n" + err);
            console.log("please fix it and start again the scan!");
            new Promise(function (resolve, reject) {
                ScanDetail = {
                    "date": currentDate[2] + "." + currentDate[1] + "." + currentDate[0],
                    "status": "Abort\n" + err,
                    "scanTime": stopTime,
                    "scanPath": searchPath,
                    "collection": collection,
                    "totalScannedNumber": scanCount,
                    "documentsNumber": documentCount,
                    "directoriesNumber": dirCount,
                    "filesNumber": fileCount
                };
                mongo.insertOne(ScanDetail, "ScanReports").then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                })
            })
                .then(() => {
                    if ((seconds == 0) && (minutes == 0))
                        stopTime = "0" + minutes + ":" + "0" + seconds;
                    else
                        stopTime = minutes + ":" + seconds;
                    clearInterval(setTime);
                    console.log("After " + stopTime + " the scan detail was inserted to the DB.");
                    process.exit(-1);
                })
                .catch((err) => {
                    if ((seconds == 0) && (minutes == 0))
                        stopTime = "0" + minutes + ":" + "0" + seconds;
                    else
                        stopTime = minutes + ":" + seconds;
                    clearInterval(setTime);
                    console.log("After " + stopTime + " the scan detail wasn't inserted and returned with an error:\n" + err);
                    console.log("please fix it and start again the scan!");
                    process.exit(-1);
                })
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
    if(valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}

//Timer set
setInterval(setTime, 1000);

var location="C:/Users/Dor/Desktop", dropFlag=false, time;

//C:/Users/Dor/Desktop


mongo.findCollectionsNameList()
    .then((collections)=> {
        for(var i=0;i<collections.length;i++)
        {
            if(collections[i].name==location[0])
                dropFlag=true;
        }
        //tries to drop the older collection first
        if(dropFlag) {
            mongo.dropCollection(location[0])
                .then(() => {
                    console.log("Scan started please wait.");
                    //Call to the scan function
                    searchTheEntireHardDrive(location, mongo.insertArr);
                })
                .catch((err) => {
                    clearInterval(setTime);
                    if((seconds==0)&&(minutes==0))
                        time="0"+minutes+":"+"0"+seconds;
                    else
                        time=minutes+":"+seconds;
                    console.log("After " + time + " Scan couldn't start because the drop collection function returned with an error:\n" + err);
                    process.exit(-1);
                });
        }
        else{
            console.log("Scan started please wait.");
            //Call to the scan function
            searchTheEntireHardDrive(location, mongo.insertArr);
        }
    })
    //if there is a problem with the database
    .catch((err)=> {
        clearInterval(setTime);
        if((seconds==0)&&(minutes==0))
            time="0"+minutes+":"+"0"+seconds;
        else
            time=minutes+":"+seconds;
        console.log("After " + time + " Scan couldn't start because the drop collection function returned with an error:\n" + err);
        process.exit(-1);
    });