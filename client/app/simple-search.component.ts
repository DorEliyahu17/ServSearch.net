//import the component declare in order to create a new one
import { Component } from '@angular/core';
import {URLSearchParams} from '@angular/http';

//import the class "File" from the file "./file"
import { File } from './file';

//import the service "FileService" from the file "./file.service"
import { FileService } from './file.service';

@Component({
    selector: 'simple-search',
    templateUrl: 'app/pages/simple-search.component.html',
    styleUrls: ['app/styles/simple-search.component.css'],
    providers: [FileService]
})

export class SimpleSearchComponent
{
    public alerts: Array<Object>=[];
    files:File[];
    isResult:boolean =false;
    file=new File();
    length=0;

    constructor(private fileService: FileService) { }

    public closeAlert(i:number):void {
        this.alerts.splice(i, 1);
    }

    search():void {
        var resultSearch = document.getElementById("result");
        resultSearch.className = "hidden";
        var name = (<HTMLInputElement>document.getElementById("FileName")).value;
        var type = (<HTMLInputElement>document.getElementById("FileType")).value;
        var server = (<HTMLInputElement>document.getElementById("FileServer")).value;

        // WORK FILE SERVICE
        // GETS THE PARAMAS

        //Parameters obj
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        params.set('type', type);
        params.set('server', server);

        //get the files arr from the service
        this.fileService.getFiles(params)
            .then((data:File[]) => {
                //console.log(data);
                for (var i=0;i<data.length;i++) {
                    if (((name != "") && (data[i].name.toLowerCase().indexOf(name.toLowerCase())!=-1)) ||
                        ((type != "") && (data[i].type.toLowerCase() == type.toLowerCase())) ||
                        ((server != "")) && (this.fileService.getServerFromLocation(data[i].location).toLowerCase() == server.toLowerCase()))
                    {
                        if(this.alerts.length>0)
                            this.alerts.splice(0, this.alerts.length);
                    }
                    else
                    {
                        data.splice(i,1);
                        i--;
                    }
                }

                if(data.length>0)
                {
                    this.files=data;
                    length=this.files.length;
                    //visible and hidden change
                    /*var regularSearch = document.getElementById("simple");
                     regularSearch.className = "hidden";*/
                    this.isResult=true;
                    var resultSearch = document.getElementById("result");
                    resultSearch.className = "visible";
                }
                else
                {
                    //warning=1
                    //danger=2
                    //success=3
                    if(this.alerts.length>0)
                        this.alerts.splice(0, this.alerts.length);
                    if((name != "") || (type != "") || (server != ""))
                        this.alerts.push({msg: 'לא נמצאה אף תוצאה, נסה לחפש שוב או לחפש בעזרת חיפוש מתקדם.', type: 1});
                    else
                        this.alerts.push({msg: 'לא הוכנס שום ערך.', type: 2});
                     /*this.alerts.push({msg: 'לא נמצאה אף תוצאה, תנסה לחפש שוב או לחפש בעזרת חיפוש מתקדם.', type: 3});*/
                }
            });

        /*
         //visible and hidden change
         var regularSearch = document.getElementById("regular");
         regularSearch.className = "hidden";
         var advanceSearch = document.getElementById("advance");
         advanceSearch.className = "visible";
         */

        // fileService.findFile(serach).then((data) =>{
        // console.log(data);
        //}
        /*
         if((name!="")&&(type!="")&&(server!="")) {
         //everything were inserted
         console.log("name: " + name + " type: " + type + " server: " + server);
         this.goToResaultAll(name, type, server);
         }
         else if((name!="")&&(type!="")) {
         //server not inserted
         console.log("name: " + name + " type: " + type);
         this.goToResaultNoServer(name, type);
         }
         else if((name!="")&&(server!="")) {
         //type not inserted
         console.log("name: " + name + " server: " + server);
         this.goToResaultNoType(name, server);
         }
         else if((type!="")&&(server!="")) {
         //name not inserted
         console.log("type: " + type + " server: " + server);
         this.goToResaultNoName(type, server);
         }
         else if(name!="")
         {
         //type and server not inserted
         console.log("name: "+name);
         this.goToResaultOnlyName(name);
         //this.fileService.getFiles();
         }
         else if(type!=""){
         //name and server and server not inserted
         console.log("type: "+type);
         this.goToResaultOnlyType(type);
         }
         else if(server!=""){
         //name and type and server not inserted
         console.log("server: "+server);
         this.goToResaultOnlyServer(server);
         }
         else {
         //nothing was inserted
         console.log("לא הוכנס ערך");
         alert("לא הוכנס שום ערך, אנא הכנס/י לפחות ערך אחד");
         }*/
    }
}