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
var FileService = (function () {
    //promise=callback
    function FileService(http) {
        this.http = http;
        //private headers = new Headers({'Content-Type': 'application/json'});
        this.filesUrl = 'http://localhost:3000/api/files'; // URL to web api
    }
    //
    //get all the files in the /api/files
    FileService.prototype.getFiles = function (params) {
        return this.http.get("http://localhost:3000/api/files", { search: params })
            .map(function (response) {
            return response.json();
        }).toPromise();
    };
    /*
     //get all the files in the /api/files
     getFiles(): Promise<File[]> {
     return this.http.get("http://localhost:3000/api/files")
     .toPromise()
     .then(response => response.json().data as File[]/* && console.log(response)/)
     .catch(this.handleError);
     }

     //get specified file from the /api/files
     getFile(name, type, server): Promise<File>{
     console.log("getFile: name:"+name+" type:"+type+" server:"+server);
     if((name!=null)&&(type!=null)&&(server!=null)){
     return this.getFiles()
     .then(Files => Files.find(file => ((file.name === name) && (file.type === type) && (this.getServerFromLocation(file.location)===server))));
     }
     else if((name!=null)&&(type!=null)){
     return this.getFiles()
     .then(Files => Files
     .find(file => ((file.name === name) && (file.type === type))));
     }
     else if((type!=null)&&(server!==null)){
     return this.getFiles()
     .then(Files => Files
     .find(file => ((file.type === type) && (this.getServerFromLocation(file.location)===server))));
     }
     else if((name!=null)&&(server!=null)){
     return this.getFiles()
     .then(Files => Files
     .find(file => ((file.name === name) && (this.getServerFromLocation(file.location)===server))));
     }
     else if(name!=null){
     return this.getFiles()
     .then(Files => Files
     .find(file => (file.name === name)));
     }
     else if(type!=null){
     return this.getFiles()
     .then(Files => Files
     .find(file => (file.type === type)));
     }
     else{
     return this.getFiles()
     .then(Files => Files
     .find(file => (this.getServerFromLocation(file.location)===server)));
     }
     }
     */
    //function that split the name of the server from the hole path
    FileService.prototype.getServerFromLocation = function (location) {
        var arr = [];
        arr = location.split(":");
        return arr[0];
    };
    //error handler
    FileService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    FileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FileService);
    return FileService;
}());
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map