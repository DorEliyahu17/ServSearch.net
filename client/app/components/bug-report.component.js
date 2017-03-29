"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
//import the component declare in order to create a new one
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
//import the service "FileService" from the file "./file.service"
var bug_report_service_1 = require("../services/bug-report.service");
//create new component
var BugReportComponent = (function () {
    function BugReportComponent(router, bugReportService) {
        this.router = router;
        this.bugReportService = bugReportService;
        this.alerts = [];
    }
    BugReportComponent.prototype.send = function () {
        var _this = this;
        this.alerts = [];
        var sender = document.getElementById("name").value;
        var subject = document.getElementById("subject").value;
        var description = document.getElementById("description").value;
        //date[0]=year, date[1]=month, date[2]=day
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/').split('/');
        if ((sender != "") && (subject != "") && (description != "")) {
            //Parameters obj
            var params = new http_1.URLSearchParams();
            params.set('name', sender);
            params.set('subject', subject);
            params.set('description', description);
            params.set('insertDate', date[2] + "." + date[1] + "." + date[0]);
            //warning=1
            //danger=2
            //success=3
            //change to insertBug
            this.bugReportService.insertBug(params).then(function (data) {
                if (data.name == "MongoError")
                    _this.alerts.push({
                        msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
                        type: 2
                    });
                else
                    _this.alerts.push({
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
    };
    return BugReportComponent;
}());
BugReportComponent = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'bug-report',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/bug-report.component.html',
        //the style of the code
        styleUrls: ['./app/styles/bug-report.component.css'],
        providers: [bug_report_service_1.BugReportService]
    })
    //the class of this new component
    ,
    __metadata("design:paramtypes", [router_1.Router, bug_report_service_1.BugReportService])
], BugReportComponent);
exports.BugReportComponent = BugReportComponent;
//# sourceMappingURL=bug-report.component.js.map