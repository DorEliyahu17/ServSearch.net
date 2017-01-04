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
        this.alerts = [];
        this.serverNames = [];
        this.isResult = false;
        this.file = new file_1.File();
        this.length = 0;
    }
    //visible the advance search
    SimpleSearchComponent.prototype.simpleToAdvance = function () {
        var simpleSearch = document.getElementById("simple");
        simpleSearch.className = "hidden";
    };
    //visible the simple search
    SimpleSearchComponent.prototype.advanceToSimple = function () {
        var simpleSearch = document.getElementById("simple");
        simpleSearch.className = "visible";
    };
    SimpleSearchComponent.prototype.closeAlert = function (i) {
        this.alerts.splice(i, 1);
    };
    SimpleSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        var j;
        this.fileService.getServerNames().then(function (data) {
            _this.serverNames = data;
        });
    };
    SimpleSearchComponent.prototype.search = function () {
        var _this = this;
        var i;
        var resultSearch = document.getElementById("result");
        resultSearch.className = "hidden";
        var name = document.getElementById("FileName").value;
        var type = document.getElementById("FileType").value;
        var server = document.getElementById("FileServer").value;
        console.log("server=" + server);
        // WORK FILE SERVICE
        // GETS THE PARAMAS
        //Parameters obj
        var params = new http_1.URLSearchParams();
        params.set('name', name);
        params.set('type', type);
        params.set('server', server.toUpperCase());
        //get the files arr from the service
        this.fileService.getFiles(params)
            .then(function (data) {
            /*for (i=0;i<data.length;i++) {
             console.log("data.length="+data.length);
             console.log("data["+i+"]:\ndata[i].name="+data[i].name+"\ndata[i].type="+data[i].type+"\ndata[i].location="+data[i].location);
             if (((name != "") && (data[i].name.toString().toLowerCase().indexOf(name.toLowerCase())!=-1)) ||
             ((type != "") && (data[i].type.toString().toLowerCase() == type.toLowerCase())) ||
             ((server != "")) && (this.fileService.getServerFromLocation(data[i].location.toString()).toLowerCase() == server.toLowerCase()))
             {
             if(this.alerts.length>0)
             this.alerts.splice(0, this.alerts.length);
             }
             else
             {
             data.splice(i,1);
             i--;
             }
             }*/
            if (data.length > 0) {
                _this.files = data;
                length = _this.files.length;
                if (_this.alerts.length > 0)
                    _this.alerts.splice(0, _this.alerts.length);
                //visible and hidden change
                /*var regularSearch = document.getElementById("simple");
                 regularSearch.className = "hidden";*/
                _this.isResult = true;
                var resultSearch = document.getElementById("result");
                resultSearch.className = "visible";
            }
            else {
                //warning=1
                //danger=2
                //success=3
                if (_this.alerts.length > 0)
                    _this.alerts.splice(0, _this.alerts.length);
                if ((name != "") || (type != "") || (server != "")) {
                    if (server == "")
                        _this.alerts.push({ msg: 'אנא בחר את השרת שבו תרצה לחפש.', type: 2 });
                    else
                        _this.alerts.push({ msg: 'לא נמצאה אף תוצאה, נסה לחפש שוב או לחפש בעזרת חיפוש מתקדם.', type: 1 });
                }
                else
                    _this.alerts.push({ msg: 'לא הוכנס שום ערך.', type: 2 });
            }
        });
    };
    SimpleSearchComponent = __decorate([
        core_1.Component({
            selector: 'simple-search',
            templateUrl: './app/pages/simple-search.component.html',
            styleUrls: ['./app/styles/simple-search.component.css'],
            providers: [file_service_1.FileService]
        }), 
        __metadata('design:paramtypes', [file_service_1.FileService])
    ], SimpleSearchComponent);
    return SimpleSearchComponent;
}());
exports.SimpleSearchComponent = SimpleSearchComponent;
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
//# sourceMappingURL=simple-search.component.js.map