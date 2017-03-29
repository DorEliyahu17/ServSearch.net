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
    public alerts: Array<Object>=[];

    constructor(private router: Router, private bugReportService: BugReportService) {}

    send(): void {
        this.alerts=[];
        var sender = (<HTMLInputElement>document.getElementById("name")).value;
        var subject = (<HTMLInputElement>document.getElementById("subject")).value;
        var description = (<HTMLInputElement>document.getElementById("description")).value;

        //date[0]=year, date[1]=month, date[2]=day
        var date = new Date().toJSON().slice(0,10).replace(/-/g,'/').split('/');

        if((sender!="")&&(subject!="")&&(description!="")) {
            //Parameters obj
            let params: URLSearchParams = new URLSearchParams();
            params.set('name', sender);
            params.set('subject', subject);
            params.set('description', description);
            params.set('insertDate', date[2]+"."+date[1]+"."+date[0]);

            //warning=1
            //danger=2
            //success=3
            //change to insertBug
            this.bugReportService.insertBug(params).then((data: any) => {
                if (data.name == "MongoError")
                    this.alerts.push({
                        msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
                        type: 2
                    });
                else
                    this.alerts.push({
                        msg: 'תודה על הדיווח! אנו ניגש לפתור אותו בהקדם האפשרי!',
                        type: 3
                    });
            });
        }
        else
            this.alerts.push({
                msg: 'אנא מלא את כל ההקריטריונים!',
                type: 2
            });
    }
}