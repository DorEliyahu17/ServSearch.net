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
//import the component declare in order to create a new one
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var router_1 = require('@angular/router');
//import the service "FileService" from the file "./file.service"
var bug_report_service_1 = require('../services/bug-report.service');
//create new component
var BugReportComponent = (function () {
    function BugReportComponent(router, bugReportService) {
        this.router = router;
        this.bugReportService = bugReportService;
    }
    BugReportComponent.prototype.send = function () {
        var sender = document.getElementById("name").value;
        var subject = document.getElementById("subject").value;
        var description = document.getElementById("description").value;
        var successAlert = document.getElementById("successAlert");
        var abortAlert = document.getElementById("abortAlert");
        //Parameters obj
        var params = new http_1.URLSearchParams();
        params.set('name', sender);
        params.set('subject', subject);
        params.set('description', description);
        //change to insertBug
        this.bugReportService.insertBug(params).then(function (data) {
            successAlert.className = "visible";
        }); /*.catch((data: any[]) => {
            abortAlert.className="visible";
        });*/
    };
    BugReportComponent = __decorate([
        core_1.Component({
            //his label in the HTML code
            selector: 'bug-report',
            //the code that will be read when the component will be called
            templateUrl: './app/pages/bug-report.component.html',
            //the style of the code
            styleUrls: ['./app/styles/bug-report.component.css'],
            providers: [bug_report_service_1.BugReportService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, bug_report_service_1.BugReportService])
    ], BugReportComponent);
    return BugReportComponent;
}());
exports.BugReportComponent = BugReportComponent;
//# sourceMappingURL=bug-report.component.js.map