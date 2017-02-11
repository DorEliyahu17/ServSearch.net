//import the component declare in order to create a new one
import {Component, Input} from '@angular/core';
import { URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';

//import the service "FileService" from the file "./file.service"
import { BugReportService } from '../services/bug-report.service';

//import the class "BugReport" from the file "../object modules/bug-report"
import { BugReport } from '../object modules/bug-report';

//create new component
@Component({
    //his label in the HTML code
    selector: 'bug-report',
    //the code that will be read when the component will be called
    templateUrl: './app/pages/bug-report.component.html',
    //the style of the code
    styleUrls: ['./app/styles/bug-report.component.css'],
    providers: [BugReportService]
})

//the class of this new component
export class BugReportComponent {

    constructor(private router: Router, private bugReportService: BugReportService) {
    }

    send(): void {
        var sender = (<HTMLInputElement>document.getElementById("name")).value;
        var subject = (<HTMLInputElement>document.getElementById("subject")).value;
        var description = (<HTMLInputElement>document.getElementById("description")).value;
        var successAlert = (<HTMLInputElement>document.getElementById("successAlert"));
        var abortAlert = (<HTMLInputElement>document.getElementById("abortAlert"));

        //Parameters obj
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', sender);
        params.set('subject', subject);
        params.set('description', description);

        //change to insertBug
        this.bugReportService.insertBug(params).then((data: any[]) => {
            successAlert.className="visible";
        });/*.catch((data: any[]) => {
            abortAlert.className="visible";
        });*/
    }
}