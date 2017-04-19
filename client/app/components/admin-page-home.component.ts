//import the component declare in order to create a new one
import {Component, OnInit} from '@angular/core';
import {AdminPageService} from "../services/admin-page.service";


//create new component
@Component({
    //his label in the HTML code
    selector: 'admin-page',
    //the code that will be read when the component will be called
    templateUrl: './app/pages/admin-page-home.component.html',
    //the style of the code
    styleUrls: ['./app/styles/admin-page-home.component.css'],
    providers: [AdminPageService]
})

//the class of this new component
export class AdminPageHomeComponent implements OnInit {
    msg: string = "";
    color: number;
    bugsNum: number;
    TodoNum: number;
    scanReportNum: number;

    constructor(private adminPageService: AdminPageService) {
    }

    ngOnInit(): void {
        this.adminPageService.getAH().then((data: any) => {
            this.msg = data.msg;
            this.color = data.color;
            this.bugsNum = data.bugsNum;
            this.TodoNum = data.TodoNum;
            this.scanReportNum = data.scanReport;
        });
    }
}