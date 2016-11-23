//including shelljs to the project
var shell = require('./node_modules/shelljs');
var mongo = require('./MongoDB');


//I need to do the recursive call by myself (based on an algorithm dijecstre, BFS, DFS and so and so on...)
//It will be more affective if I will open a new script
function searchTheHardDrive(searchPath, writeToDB, disconnect)
{
    console.log("Loading...");
//do the command is in the shell
    shell.exec('ls -l -R ' + searchPath + ' | grep -v .lnk | tr -s " "', {silent: false}, function (err, resault){
        var i,
            count=0,
            count2=0,
            countFiles,
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
            ArrOfArrays =[],
            tempName="";

        resVar = resault;
        dirArr = resVar.split(searchPath);

        countFiles=resVar.split("\n");
        console.log("Scan Stopped");
        console.log("dirArr.length="+dirArr.length);
        console.log("countFiles.length="+countFiles.length);
        console.log("countFiles.length-x="+(countFiles.length-((3*(dirArr.length-1)))));

        /*
        for (dirIndex = 1; dirIndex < dirArr.length; dirIndex++) {
            //console.log("Dir length: "+dirIndex+"/"+dirArr.length);
            filesArr = dirArr[dirIndex].split("\n");
            countFiles+=(filesArr.length-1);
            if (((dirArr.length - 1) != dirIndex) && (filesArr.length > 3))
                countFiles-=2;
            else
                countFiles-=1;
        }

        console.log("countFiles=" + countFiles);
*/

        //for loop on the directory arr - fix from here
        for (dirIndex = 1; dirIndex < dirArr.length; dirIndex++) {
            filesArr = dirArr[dirIndex].split("\n");

            //for loop on the files in the directory
            //insert all the directories beside the last one
            if (((dirArr.length - 1) != dirIndex) && (filesArr.length > 3)) {
                for (filesIndex = 0; filesIndex < filesArr.length - 2; filesIndex++) {
                    //update the path of this father directory
                    if (filesIndex == 0) {
                        filesArr[filesIndex] = filesArr[filesIndex].replace(/:/g, "/");
                        path = searchPath + filesArr[filesIndex];
                    }

                    //update the file details
                    else if (filesIndex != 1) {
                        fileNameAndType = "";
                        fileAndDirObject = "";
                        tempName = "";
                        //cut the files details and store it in object
                        fileDetails = filesArr[filesIndex].split(" ");
                        for (i = 8; i < fileDetails.length; i++)
                            tempName += fileDetails[i] + " ";
                        tempName = tempName.slice(0, tempName.length - 1);
                        //if this is a directory
                        if (fileDetails[0].charAt(0) == "d") {
                            fileAndDirObject = new mongo.Model(
                                {
                                    name: tempName,
                                    type: 'Directory',
                                    size: parseInt(fileDetails[4]),
                                    location: path,
                                    permissions: fileDetails[0].slice(1),
                                    createdUser: fileDetails[2],
                                    group: fileDetails[3],
                                    modifidedDate: fileDetails[5] + " " + fileDetails[6] + " " + fileDetails[7]
                                });
                            filesAndDirsObjectArr.push(fileAndDirObject);

                            //console.log("File number " + (++count2) + "From " + (countFiles.length-((3*(dirArr.length-1)))));
                        }
                        else {
                            fileNameAndType = tempName.split(".");
                            fileAndDirObject = new mongo.Model(
                                {
                                    name: fileNameAndType[0],
                                    type: fileNameAndType[1],
                                    size: parseInt(fileDetails[4]),
                                    location: path,
                                    permissions: fileDetails[0].slice(1),
                                    createdUser: fileDetails[2],
                                    group: fileDetails[3],
                                    modifidedDate: fileDetails[5] + " " + fileDetails[6] + " " + fileDetails[7]
                                });
                            filesAndDirsObjectArr.push(fileAndDirObject);

                            //console.log("File number " + (++count2) + "From " + (countFiles.length-((3*(dirArr.length-1)))));
                        }
                        if (filesAndDirsObjectArr.length == 29000) {
                            //the mongo can insert only 16MB every time
                            writeToDB(filesAndDirsObjectArr, disconnect);
                            //console.log("size of the Arr: " + memorySizeOf(filesAndDirsObjectArr));
                            filesAndDirsObjectArr = [];
                            //console.log("Arr number " + (++count));
                        }
                    }
                }
            }
            //insert the last directory
            else {
                for (filesIndex = 0; filesIndex < filesArr.length - 1; filesIndex++) {
                    //update the path of this father directory
                    if (filesIndex == 0) {
                        filesArr[filesIndex] = filesArr[filesIndex].replace(/:/g, "/");
                        path = searchPath + filesArr[filesIndex];
                    }

                    //update the file details
                    else if (filesIndex != 1) {
                        fileNameAndType = "";
                        fileAndDirObject = "";
                        tempName = "";
                        //cut the files details and store it in object
                        fileDetails = filesArr[filesIndex].split(" ");
                        for (i = 8; i < fileDetails.length; i++)
                            tempName += fileDetails[i] + " ";
                        tempName = tempName.slice(0, tempName.length - 1);

                        //if this is a directory
                        if (fileDetails[0].charAt(0) == "d") {
                            fileAndDirObject = new mongo.Model(
                                {
                                    name: tempName,
                                    type: 'Directory',
                                    size: parseInt(fileDetails[4]),
                                    location: path,
                                    permissions: fileDetails[0].slice(1),
                                    createdUser: fileDetails[2],
                                    group: fileDetails[3],
                                    modifidedDate: fileDetails[5] + " " + fileDetails[6] + " " + fileDetails[7]
                                });
                            filesAndDirsObjectArr.push(fileAndDirObject);

                            //console.log("File number " + (++count2) + "From " + (countFiles.length-((3*(dirArr.length-1)))));
                        }
                        else {
                            fileNameAndType = tempName.split(".");
                            fileAndDirObject = new mongo.Model(
                                {
                                    name: fileNameAndType[0],
                                    type: fileNameAndType[1],
                                    size: parseInt(fileDetails[4]),
                                    location: path,
                                    permissions: fileDetails[0].slice(1),
                                    createdUser: fileDetails[2],
                                    group: fileDetails[3],
                                    modifidedDate: fileDetails[5] + " " + fileDetails[6] + " " + fileDetails[7]
                                });
                            filesAndDirsObjectArr.push(fileAndDirObject);

                            //console.log("File number " + (++count2) + "From " + (countFiles.length-((3*(dirArr.length-1)))));
                        }
                    }
                    if (filesAndDirsObjectArr.length == 29000) {
                        //the mongo can insert only 16MB every time
                        writeToDB(filesAndDirsObjectArr, disconnect);
                        //console.log("size of the Arr: " + memorySizeOf(filesAndDirsObjectArr));
                        filesAndDirsObjectArr = [];
                        //console.log("Arr number " + (++count));
                    }
                }
                if (filesAndDirsObjectArr.length < 29000) {
                    //the mongo can insert only 16MB every time5
                    writeToDB(filesAndDirsObjectArr, disconnect);
                    //console.log("size of the Arr: " + memorySizeOf(filesAndDirsObjectArr));
                    filesAndDirsObjectArr = [];
                    //console.log(" Last arr number " + (++count));
                }
            }
        }
        /*
         //the mongo can insert only 16MB every time
         writeToDB(ArrOfArrays, disconnect);
         */
        /*
         //insert without arr
         for(i=0;i<filesAndDirsObjectArr.length;i++)
         WriteToDB(filesAndDirsObjectArr[i]);
         console.log(filesAndDirsObjectArr);
         */
    });
}

searchTheHardDrive("C:/Users/Dor/Desktop/stam", mongo.writeToDB, mongo.disconnect);

//Users/Dor/Desktop/stam

//there are too much rows in the split and the arr has 260620 only


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





















/*
 function WriteToDB(res, callback)
 {mm
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
 }
 */