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
//import the class "File" from the file "./file"
var file_1 = require('./file');
//import the service "FileService" from the file "./file.service"
var file_service_1 = require('./file.service');
var http_1 = require("@angular/http");
//create new component
var AdvanceSearchComponent = (function () {
    function AdvanceSearchComponent(fileService) {
        this.fileService = fileService;
        this.serverNames = [];
        this.isResult = false;
        this.alerts = [];
        this.file = new file_1.File();
    }
    AdvanceSearchComponent.prototype.search = function () {
        var _this = this;
        var i;
        var resultSearch = document.getElementById("result");
        resultSearch.className = "hidden";
        var name = document.getElementById("FileName").value;
        var type = document.getElementById("FileType").value;
        var server = document.getElementById("FileServer").value;
        var dateCheck = document.getElementById("date-check").checked;
        var dateRadio1 = document.getElementById("date-radio1").checked;
        var dateRadio2 = document.getElementById("date-radio2").checked;
        var date1Field = document.getElementById("date-text1").value;
        var date2Field = document.getElementById("date-text2").value;
        var sizeCheck = document.getElementById("size-check").checked;
        var sizeRadio1 = document.getElementById("size-radio1").checked;
        var sizeRadio2 = document.getElementById("size-radio2").checked;
        var size1Field = document.getElementById("size-text1").value;
        var size2Field = document.getElementById("size-text2").value;
        if (dateCheck) {
            if (dateRadio1)
                date2Field = "";
            if (dateRadio2)
                date1Field = "";
        }
        if (sizeCheck) {
            if (sizeRadio1)
                size2Field = "";
            if (sizeRadio2)
                size1Field = "";
        }
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
            if (data.length > 0) {
                _this.files = data;
                length = _this.files.length;
                if (_this.alerts.length > 0)
                    _this.alerts.splice(0, _this.alerts.length);
                _this.isResult = true;
                //visible and hidden change
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
    //function enable/disable the radio input
    AdvanceSearchComponent.prototype.clickCheck = function (radio1ID, radio2ID, input1ID, input2ID) {
        var radio1Field = document.getElementById(radio1ID);
        var radio2Field = document.getElementById(radio2ID);
        var input1Field = document.getElementById(input1ID);
        var input2Field = document.getElementById(input2ID);
        if ((radio1Field.hasAttribute("disabled")) && (radio2Field.hasAttribute("disabled"))) {
            //enable the radio fields
            radio1Field.removeAttribute("disabled");
            radio2Field.removeAttribute("disabled");
            //enable the input field
            if (radio1Field.checked)
                input1Field.removeAttribute("disabled");
            if (radio2Field.checked)
                input2Field.removeAttribute("disabled");
        }
        else {
            //disable the radio fields
            radio1Field.setAttribute("disabled", "disabled");
            radio2Field.setAttribute("disabled", "disabled");
            //disable the input field
            if (!(input1Field.checked))
                input1Field.setAttribute("disabled", "disabled");
            if (!(input2Field.checked))
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AdvanceSearchComponent.prototype, "serverNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AdvanceSearchComponent.prototype, "files", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvanceSearchComponent.prototype, "length", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AdvanceSearchComponent.prototype, "isResult", void 0);
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