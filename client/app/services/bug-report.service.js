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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var BugReportService = (function () {
    //private apiUrl = 'http://192.168.1.15:3000/api';  // URL to web api
    function BugReportService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3000/api'; // URL to web api
    }
    //get the bugs that reported from the /api/reportedBugs
    BugReportService.prototype.getBugs = function () {
        return this.http.get(this.apiUrl + "/reportedBugs")
            .map(function (response) {
            return response.json();
        }).toPromise();
    };
    BugReportService.prototype.insertBug = function (params) {
        return this.http.get(this.apiUrl + "/insertBug", { search: params })
            .map(function (response) {
            return response.json();
        }).toPromise();
    };
    BugReportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BugReportService);
    return BugReportService;
}());
exports.BugReportService = BugReportService;
//# sourceMappingURL=bug-report.service.js.map