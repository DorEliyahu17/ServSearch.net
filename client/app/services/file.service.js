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
require("rxjs/add/operator/toPromise");
var FileService = (function () {
    //private apiUrl = 'http://192.168.1.15:3000/api';  // URL to web api
    //promise=callback
    function FileService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3000/api'; // URL to web api
    }
    //get all the files in the /api/files
    FileService.prototype.getFiles = function (params) {
        return this.http.get(this.apiUrl + "/files", { search: params })
            .map(function (response) {
            return response.json();
        }).toPromise();
    };
    FileService.prototype.getServerNames = function () {
        return this.http.get(this.apiUrl + "/collections")
            .map(function (response) {
            return response.json();
        }).toPromise();
    };
    ;
    return FileService;
}());
FileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map