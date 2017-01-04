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
var file_service_1 = require('./file.service');
//create new component
var AdvanceSearchComponent = (function () {
    function AdvanceSearchComponent(fileService) {
        this.fileService = fileService;
    }
    AdvanceSearchComponent.prototype.search = function () {
        console.log("advance search - function search activated");
    };
    AdvanceSearchComponent.prototype.advanceSearch = function () {
        var regularSearch = document.getElementById("regular");
        regularSearch.className = "hidden";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "visible";
    };
    AdvanceSearchComponent.prototype.simpleSearch = function () {
        var regularSearch = document.getElementById("regular");
        regularSearch.className = "visible";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "hidden";
    };
    /*
     //visible the regular search
     advanceToRegular(): void{
     //visible and hidden change
     var regularSearch = document.getElementById("regular");
     regularSearch.className = "visible";
     var advanceSearch = document.getElementById("advance");
     advanceSearch.className = "hidden";
     }

     //visible the advance search
     regularToAdvance(): void{
     var regularSearch = document.getElementById("regular");
     regularSearch.className = "hidden";
     var advanceSearch = document.getElementById("advance");
     advanceSearch.className = "visible";
     }
     */
    //function enable/disable the radio input
    AdvanceSearchComponent.prototype.clickCheck = function (radio1ID, radio2ID, input1ID, input2ID) {
        var radio1Field = document.getElementById(radio1ID);
        var radio2Field = document.getElementById(radio2ID);
        var input1Field = document.getElementById(input1ID);
        var input2Field = document.getElementById(input2ID);
        if ((radio1Field.hasAttribute("disabled")) && (radio2Field.hasAttribute("disabled"))) {
            radio1Field.removeAttribute("disabled");
            radio2Field.removeAttribute("disabled");
            if (radio1Field.hasAttribute("disabled"))
                input1Field.removeAttribute("disabled");
            if (radio2Field.hasAttribute("disabled"))
                input2Field.removeAttribute("disabled");
        }
        else {
            radio1Field.setAttribute("disabled", "disabled");
            radio2Field.setAttribute("disabled", "disabled");
            if (!(input1Field.hasAttribute("disabled")))
                input1Field.setAttribute("disabled", "disabled");
            if (!(input2Field.hasAttribute("disabled")))
                input2Field.setAttribute("disabled", "disabled");
        }
    };
    //function enable/disable the input field
    AdvanceSearchComponent.prototype.radioCheck = function (enableInputID, disableInputID) {
        var input1Field = document.getElementById(enableInputID);
        var input2Field = document.getElementById(disableInputID);
        if (input1Field.hasAttribute("disabled")) {
            input1Field.removeAttribute("disabled");
            if (!(input2Field.hasAttribute("disabled")))
                input2Field.setAttribute("disabled", "disabled");
        }
    };
    AdvanceSearchComponent = __decorate([
        core_1.Component({
            //his label in the HTML code
            selector: 'advanceSearch',
            //the code that will be read when the component will be called
            templateUrl: './app/pages/advance-search.component.html',
            //the style of the code
            styleUrls: ['./app/styles/advance-search.component.css'],
            providers: [file_service_1.FileService]
        }), 
        __metadata('design:paramtypes', [file_service_1.FileService])
    ], AdvanceSearchComponent);
    return AdvanceSearchComponent;
}());
exports.AdvanceSearchComponent = AdvanceSearchComponent;
//# sourceMappingURL=advance-search.component.js.map