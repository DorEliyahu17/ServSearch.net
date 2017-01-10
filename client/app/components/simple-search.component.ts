//import the component declare in order to create a new one
import {Component, OnInit} from '@angular/core';
import {URLSearchParams} from '@angular/http';

//import the class "File" from the file "./file"
import { File } from '../object modules/file';

//import the service "FileService" from the file "./file.service"
import { FileService } from '../services/file.service';

@Component({
    selector: 'simple-search',
    templateUrl: './app/pages/simple-search.component.html',
    styleUrls: ['./app/styles/simple-search.component.css'],
    providers: [FileService]
})

export class SimpleSearchComponent implements OnInit
{
    public alerts: Array<Object>=[];
    serverNames: Array<any>=[];
    files:File[];
    isResult:boolean =false;
    file=new File();
    length=0;

    constructor(private fileService: FileService) { }

    //visible the advance search
    simpleToAdvance(): void{
        var simpleSearch = document.getElementById("simple");
        simpleSearch.className = "hidden";
    }

    //visible the simple search
    advanceToSimple(): void{
        var simpleSearch = document.getElementById("simple");
        simpleSearch.className = "visible";
    }

    public closeAlert(i:number):void {
        this.alerts.splice(i, 1);
    }

    ngOnInit():void{
        var i;
        this.fileService.getServerNames().then((data: any[]) => {
            for(i=0;i<data.length;i++) {
                if(data[i].name != "Admins")
                    this.serverNames.push(data[i]);
            }
        });
    }

    search():void {
        var i;
        var resultSearch = document.getElementById("result");
        resultSearch.className = "hidden";
        var name = (<HTMLInputElement>document.getElementById("FileName")).value;
        var type = (<HTMLInputElement>document.getElementById("FileType")).value;
        var server = (<HTMLInputElement>document.getElementById("FileServer")).value;
        console.log("server="+server);

        //Parameters obj
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        params.set('type', type);
        params.set('server', server.toUpperCase());

        //get the files arr from the service
        this.fileService.getFiles(params)
            .then((data:File[]) => {
                if(data.length>0)
                {
                    this.files=data;
                    length=this.files.length;
                    if(this.alerts.length>0)
                        this.alerts.splice(0, this.alerts.length);
                    this.isResult=true;
                    //visible and hidden change
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
                    if((name != "") || (type != "") || (server != "")) {
                        if (server == "")
                            this.alerts.push({msg: 'אנא בחר את השרת שבו תרצה לחפש.', type: 2});
                        else
                            this.alerts.push({msg: 'לא נמצאה אף תוצאה, נסה לחפש שוב או לחפש בעזרת חיפוש מתקדם.', type: 1});
                    }
                    else
                        this.alerts.push({msg: 'לא הוכנס שום ערך.', type: 2});
                }
            });
    }
}