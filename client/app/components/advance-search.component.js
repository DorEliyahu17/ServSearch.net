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
//import the service "FileService" from the file "./file.service"
var file_service_1 = require('../services/file.service');
//create new component
var AdvanceSearchComponent = (function () {
    function AdvanceSearchComponent(fileService) {
        this.fileService = fileService;
    }
    AdvanceSearchComponent.prototype.search = function () {
        console.log("advance search - function search activated");
    };
    AdvanceSearchComponent.prototype.advanceSearch = function () {
        this.fileService.simpleToAdvance();
    };
    AdvanceSearchComponent.prototype.simpleSearch = function () {
        this.fileService.advanceToSimple();
    };
    //visible the regular search
    AdvanceSearchComponent.prototype.advanceToRegular = function () {
        //visible and hidden change
        var regularSearch = document.getElementById("regular");
        regularSearch.className = "visible";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "hidden";
    };
    //visible the advance search
    AdvanceSearchComponent.prototype.regularToAdvance = function () {
        var regularSearch = document.getElementById("regular");
        regularSearch.className = "hidden";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "visible";
    };
    AdvanceSearchComponent.prototype.click2Check = function () {
        var inputField = document.getElementById("user-input");
        if (inputField.getAttribute("disable") == "disable") {
            console.log("inside");
            inputField.removeAttribute("disabled");
        }
        else {
            inputField.setAttribute("disabled", "enabled");
        }
    };
    AdvanceSearchComponent = __decorate([
        core_1.Component({
            //his label in the HTML code
            selector: 'advanceSearch',
            //the code that will be read when the component will be called
            templateUrl: '../pages/advance-search.component.html',
            //the style of the code
            styleUrls: ['../styles/advance-search.component.css'],
            providers: [file_service_1.FileService]
        }), 
        __metadata('design:paramtypes', [file_service_1.FileService])
    ], AdvanceSearchComponent);
    return AdvanceSearchComponent;
}());
exports.AdvanceSearchComponent = AdvanceSearchComponent;
//# sourceMappingURL=advance-search.component.js.map