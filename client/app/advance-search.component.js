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
//import the service "FileService" from the file "./file.service"
var file_service_1 = require('./file.service');
//create new component
var AdvanceSearchComponent /* implements OnInit*/ = (function () {
    function AdvanceSearchComponent /* implements OnInit*/(router /*, private fileService: FileService*/) {
        this.router = router;
        this.files = [
            {
                name: "File 1",
                type: "txt",
                size: "15654",
                location: "c:/stam/stam1.1",
                premissions: "xsakmxas",
                createdUser: "Dor",
                modifidedDate: "1.1.16"
            },
            {
                name: "File 2",
                type: "doc",
                size: "1218",
                location: "c:/stam/stam1.2",
                premissions: "xsascdsfdxkmxas",
                createdUser: "dcs",
                modifidedDate: "7.1.16"
            },
            {
                name: "File 3",
                type: "ts",
                size: "2138",
                location: "c:/stam/stam1.3",
                premissions: "xsakcxzzxczxmxas",
                createdUser: "sxz",
                modifidedDate: "1.8.16"
            }
        ];
    }
    /*ngOnInit(): void {

    }*/
    AdvanceSearchComponent /* implements OnInit*/.prototype.search = function () {
    };
    AdvanceSearchComponent /* implements OnInit*/.prototype.visibleAndHidden = function () {
        var regularSearch = document.getElementById("regular");
        regularSearch.className = "hidden";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "visible";
    };
    AdvanceSearchComponent /* implements OnInit*/.prototype.click2Check = function () {
        var inputField = document.getElementById("user-input");
        if (inputField.getAttribute("disable") == "disable") {
            console.log("inside");
            inputField.removeAttribute("disabled");
        }
        else {
            inputField.setAttribute("disable", "disable");
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvanceSearchComponent /* implements OnInit*/.prototype, "filename", void 0);
    AdvanceSearchComponent /* implements OnInit*/ = __decorate([
        core_1.Component({
            //his label in the HTML code
            selector: 'advanceSearch',
            //the code that will be read when the component will be called
            templateUrl: 'app/pages/advance-search.component.html',
            //the style of the code
            styleUrls: ['app/styles/advance-search.component.css'],
            providers: [file_service_1.FileService]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AdvanceSearchComponent /* implements OnInit*/);
    return AdvanceSearchComponent /* implements OnInit*/;
}());
exports.AdvanceSearchComponent /* implements OnInit*/ = AdvanceSearchComponent /* implements OnInit*/;
//# sourceMappingURL=advance-search.component.js.map