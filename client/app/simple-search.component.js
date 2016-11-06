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
//import the class "File" from the file "./file"
var file_1 = require('./file');
//import the service "FileService" from the file "./file.service"
var file_service_1 = require('./file.service');
var SimpleSearchComponent = (function () {
    function SimpleSearchComponent(fileService) {
        this.fileService = fileService;
        this.isResult = false;
        this.file = new file_1.File();
    }
    SimpleSearchComponent.prototype.search = function () {
        var _this = this;
        var resultSearch = document.getElementById("result");
        resultSearch.className = "hidden";
        var name = document.getElementById("FileName").value;
        var type = document.getElementById("FileType").value;
        var server = document.getElementById("FileServer").value;
        // WORK FILE SERVICE
        // GETS THE PARAMAS
        //Parameters obj
        var params = new http_1.URLSearchParams();
        params.set('name', name);
        params.set('type', type);
        params.set('server', server);
        //get the files arr from the service
        this.fileService.getFiles(params)
            .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (((name != "") && (data[i].name.indexOf(name) != -1)) ||
                    ((type != "") && (data[i].type.toLowerCase() == type.toLowerCase())) ||
                    ((server != "")) && (_this.fileService.getServerFromLocation(data[i].location).toLowerCase() == server.toLowerCase())) {
                    console.log("OK");
                }
                else {
                    data.splice(i, 1);
                    i--;
                }
            }
            console.log(data);
            if (data.length > 0) {
                _this.files = data;
                //visible and hidden change
                /*var regularSearch = document.getElementById("simple");
                 regularSearch.className = "hidden";*/
                var resultSearch = document.getElementById("result");
                resultSearch.className = "visible";
            }
            else {
                alert("לא נמצאה אף תוצאה, תנסה לחפש שוב או לחפש בעזרת חיפוש מתקדם.");
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
    };
    SimpleSearchComponent = __decorate([
        core_1.Component({
            selector: 'simple-search',
            templateUrl: 'app/pages/simple-search.component.html',
            styleUrls: ['app/styles/simple-search.component.css'],
            providers: [file_service_1.FileService]
        }), 
        __metadata('design:paramtypes', [file_service_1.FileService])
    ], SimpleSearchComponent);
    return SimpleSearchComponent;
}());
exports.SimpleSearchComponent = SimpleSearchComponent;
//# sourceMappingURL=simple-search.component.js.map