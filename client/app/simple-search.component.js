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
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
//import the service "FileService" from the file "./file.service"
var file_service_1 = require('./file.service');
var SimpleSearchComponent = (function () {
    function SimpleSearchComponent(router, fileService) {
        this.router = router;
        this.fileService = fileService;
    }
    SimpleSearchComponent.prototype.search = function () {
        var name = document.getElementById("FileName").value;
        var type = document.getElementById("FileType").value;
        var server = document.getElementById("FileServer").value;
        // WORK FILE SERVICE
        // GETS THE PARAMAS
        // Parameters obj-
        var params = new http_1.URLSearchParams();
        params.set('name', name);
        params.set('type', type);
        params.set('server', server);
        var link = ['/resault', name, type, server];
        this.router.navigate(link);
        // fileService.findFile(serach).then((data) =>{
        // console.log(data);
        //}
        if ((name != "") && (type != "") && (server != "")) {
            //everything were inserted
            console.log("name: " + name + " type: " + type + " server: " + server);
            this.goToResaultAll(name, type, server);
        }
        else if ((name != "") && (type != "")) {
            //server not inserted
            console.log("name: " + name + " type: " + type);
            this.goToResaultNoServer(name, type);
        }
        else if ((name != "") && (server != "")) {
            //type not inserted
            console.log("name: " + name + " server: " + server);
            this.goToResaultNoType(name, server);
        }
        else if ((type != "") && (server != "")) {
            //name not inserted
            console.log("type: " + type + " server: " + server);
            this.goToResaultNoName(type, server);
        }
        else if (name != "") {
            //type and server not inserted
            console.log("name: " + name);
            this.goToResaultOnlyName(name);
        }
        else if (type != "") {
            //name and server and server not inserted
            console.log("type: " + type);
            this.goToResaultOnlyType(type);
        }
        else if (server != "") {
            //name and type and server not inserted
            console.log("server: " + server);
            this.goToResaultOnlyServer(server);
        }
        else {
            //nothing was inserted
            console.log("לא הוכנס ערך");
            alert("לא הוכנס שום ערך, אנא הכנס/י לפחות ערך אחד");
        }
    };
    //go to resault of all variables
    SimpleSearchComponent.prototype.goToResaultAll = function (name, type, server) {
        var link = ['/resault', name, type, server];
        this.router.navigate(link);
    };
    //go to resault without name
    SimpleSearchComponent.prototype.goToResaultNoName = function (type, server) {
        var link = ['/resault', type, server];
        this.router.navigate(link);
    };
    //go to resault without type
    SimpleSearchComponent.prototype.goToResaultNoType = function (name, server) {
        var link = ['/resault', name, server];
        this.router.navigate(link);
    };
    //go to resault without server
    SimpleSearchComponent.prototype.goToResaultNoServer = function (name, type) {
        var link = ['/resault', name, type];
        this.router.navigate(link);
    };
    //go to resault only name
    SimpleSearchComponent.prototype.goToResaultOnlyName = function (name) {
        var link = ['/resault', name];
        this.router.navigate(link);
    };
    //go to resault only type
    SimpleSearchComponent.prototype.goToResaultOnlyType = function (type) {
        var link = ['/resault', type];
        this.router.navigate(link);
    };
    //go to resault only server
    SimpleSearchComponent.prototype.goToResaultOnlyServer = function (server) {
        var link = ['/resault', server];
        this.router.navigate(link);
    };
    SimpleSearchComponent = __decorate([
        core_1.Component({
            selector: 'simplesearch',
            templateUrl: 'app/pages/simple-search.component.html',
            styleUrls: ['app/styles/simple-search.component.css'],
            providers: [file_service_1.FileService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, file_service_1.FileService])
    ], SimpleSearchComponent);
    return SimpleSearchComponent;
}());
exports.SimpleSearchComponent = SimpleSearchComponent;
//# sourceMappingURL=simple-search.component.js.map