//including shelljs and my MongoDB client to the script
var shell = require('./node_modules/shelljs');
var mongo = require('./MongoDriver');

//Timer parameters
var minutes = 0;
var seconds = 0;
var totalSeconds = 0;

//the "main" function
function searchTheEntireHardDrive(searchPath, writeToDB)
{

    var allInsertPromises = [];

    //delete after it works
    var arrsIndex=1, countF=0;


    //do the command is in the shell
    shell.exec('ls -l -R ' + searchPath + ' | grep -v .lnk | tr -s " "', {silent: true, maxBuffer:100000*1024}, function (err, resault){
        console.log("After "+minutes+":"+seconds+" this scan was completed");
        console.log("now just wait to the insert.");
        var i,
            j,
            count=1,
            path,
            date,
            filesArr,
            dirCheck=[],
            res,
            fileNameAndType=[], //File name and type arr.
            filesAndDirsObjectArr = [], //File and directories object arr
            ArrOfDirs =[],
            tempDirName=[],
            tempName="";

        res=resault;
        filesArr=res.split("\n");
        console.log("Num of files="+(filesArr.length));
        path = searchPath;
        for(i=0;i<(filesArr.length-1);i++) {
            //if it is a file row
            if (!((filesArr[i][0] == searchPath[0]) || (filesArr[i][0] == "t") || (filesArr[i] == ""))) {

                /*
                if(dirCheck[7].indexOf(":")==-1)
                    date=dirCheck[5] + " " + dirCheck[6] + " " + dirCheck[7];
                else
                    date=dirCheck[5] + " " + dirCheck[6] + " 2016";
                */

                countF++;


                dirCheck = filesArr[i].split(" ");
                tempName = dirCheck[8];
                for (j = 9; j < dirCheck.length; j++) {
                    if (j == (dirCheck.length - 1))
                        tempName += " " + dirCheck[j];
                    else
                        tempName += dirCheck[j] + " ";
                }
                if (dirCheck[0].charAt(0) == 'd') {
                    //if this is a directory create a model and push it to the arr
                    if (dirCheck[0].charAt(0) == "d") {
                        var fileAndDirObject = {
                            name: tempName,
                            type: 'Directory',
                            size: parseInt(dirCheck[4]), //everything will be in bytes and in the code it will be converted to kilo or mega bytes
                            location: path,
                            //permissions: dirCheck[0].slice(1),
                            createdUser: dirCheck[2],
                            group: dirCheck[3],
                            //modifiedDate: date
                        };
                        ArrOfDirs.push(fileAndDirObject);
                        //if the arr is more than 16MB insert it to the DB and clean it
                        if(filesAndDirsObjectArr.length==297726){
                            console.log("\n\nAfter " + minutes + ":" + seconds +" arr number: "+(arrsIndex++)+" / "+(res.length/297726)+ " was inserted to the mongo\n\n");
                            allInsertPromises.push(writeToDB(filesAndDirsObjectArr));
                            count=1;
                            filesAndDirsObjectArr = [];
                        }
                        filesAndDirsObjectArr.push(fileAndDirObject);
                    }
                }
                else {
                    fileNameAndType = tempName.split(".");
                    if (fileNameAndType[1] == undefined)
                        fileNameAndType.push("");
                    var fileAndDirObject = {
                        name: fileNameAndType[0],
                        type: fileNameAndType[1],
                        size: parseInt(dirCheck[4]), //everything will be in bytes and in the code it will be converted to kilo or mega bytes
                        location: path,
                        //permissions: dirCheck[0].slice(1),
                        createdUser: dirCheck[2],
                        group: dirCheck[3],
                        //modifiedDate: date
                    };
                    if(filesAndDirsObjectArr.length==297726){
                        console.log("\n\nAfter " + minutes + ":" + seconds +" arr number: "+(arrsIndex++)+" / "+(res.length/297726)+ " was inserted to the mongo\n\n");
                        allInsertPromises.push(writeToDB(filesAndDirsObjectArr));

                        count=1;

                        filesAndDirsObjectArr = [];
                    }
                    filesAndDirsObjectArr.push(fileAndDirObject);
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


        console.log("true files and dirs: "+countF);
        console.log("filesAndDirsObjectArr.length="+filesAndDirsObjectArr.length);


        if((filesAndDirsObjectArr.length<=297726)&&(filesAndDirsObjectArr.length>0)){
            console.log("\n\nAfter " + minutes + ":" + seconds +" arr number: "+(arrsIndex++)+" / "+(filesArr.length/297726)+ " was inserted to the mongo\n\n");
            allInsertPromises.push(writeToDB(filesAndDirsObjectArr));
        }

        Promise.all(allInsertPromises).then((data)=>{
            console.log("After " + minutes + ":" + seconds + " this scan was inserted to the mongo");
            clearInterval(setTime);
        },(error)=>{
            console.log("After " + minutes + ":" + seconds + " this scan returned error");
            clearInterval(setTime);
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

/*
mongo.testConnection().then(function(){
    console.log("Scan started please wait.");
    searchTheEntireHardDrive("C:/Users/Dor/Desktop", mongo.insertArr);
})
    .catch(function(){
        console.log("Open the database and restart the script");
        clearInterval(setTime);
    });
*/

console.log("Scan started please wait.");
searchTheEntireHardDrive("C:/Users/Dor/Desktop", mongo.insertArr);

//Users/Dor/Desktop/stam