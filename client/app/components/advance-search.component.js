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
//import the class "File" from the file "./file"
var file_1 = require("../object modules/file");
//import the service "FileService" from the file "./file.service"
var file_service_1 = require("../services/file.service");
//create new component
var AdvanceSearchComponent = (function () {
    function AdvanceSearchComponent(fileService) {
        this.fileService = fileService;
        this.file = new file_1.File();
    }
    AdvanceSearchComponent.prototype.search = function () {
        var _this = this;
        this.isResult = false;
        this.loadingFlag = true;
        this.files = [];
        this.length = 0;
        var temp;
        if (this.alerts.length > 0)
            this.alerts.splice(0, this.alerts.length);
        var name = document.getElementById("FileName").value;
        var type = document.getElementById("FileType").value;
        var server = document.getElementById("FileServer").value;
        var dateCheck = document.getElementById("date-check").checked;
        var dateRadio1 = document.getElementById("date-radio1").checked;
        var dateRadio2 = document.getElementById("date-radio2").checked;
        var dateField = document.getElementById("date-text").value;
        var dateFieldLow = document.getElementById("date-textLow").value;
        var dateFieldHigh = document.getElementById("date-textHigh").value;
        var sizeCheck = document.getElementById("size-check").checked;
        var sizeRadio1 = document.getElementById("size-radio1").checked;
        var sizeRadio2 = document.getElementById("size-radio2").checked;
        var sizeField = document.getElementById("size-text").value;
        var sizeTypeField = document.getElementById("size-type").value;
        var sizeFieldLow = document.getElementById("size-textLow").value;
        var sizeTypeFieldLow = document.getElementById("size-typeLow").value;
        var sizeFieldHigh = document.getElementById("size-textHigh").value;
        var sizeTypeFieldHigh = document.getElementById("size-typeHigh").value;
        if (server == "") {
            this.loadingFlag = false;
            if ((name == "") && (type == ""))
                this.alerts.push({ msg: 'אנא מלא את אחד מהמסננים ואת השרת שבו תרצה לחפש.', type: 2 });
            else
                this.alerts.push({ msg: 'אנא בחר את השרת שבו תרצה לחפש.', type: 2 });
        }
        else {
            if ((name == "") && (type == "")) {
                this.loadingFlag = false;
                this.alerts.push({ msg: 'אנא מלא את אחד מהמסננים ואת השרת שבו תרצה לחפש.', type: 2 });
            }
            else {
                if (dateCheck) {
                    if (dateRadio1) {
                        dateFieldLow = "";
                        dateFieldHigh = "";
                        temp = dateField.split("/");
                        dateField = temp[2] + temp[1] + temp[0];
                    }
                    if (dateRadio2) {
                        dateField = "";
                        temp = dateFieldLow.split("/");
                        dateFieldLow = temp[2] + temp[1] + temp[0];
                        temp = dateFieldHigh.split("/");
                        dateFieldHigh = temp[2] + temp[1] + temp[0];
                    }
                }
                else {
                    dateFieldLow = "";
                    dateFieldHigh = "";
                    dateField = "";
                }
                if (sizeCheck) {
                    if ((sizeRadio1) && (sizeTypeField != "")) {
                        sizeFieldLow = "";
                        sizeFieldHigh = "";
                        switch (sizeTypeField) {
                            case "Byte":
                                break;
                            case "KB":
                                sizeField = "" + parseInt(sizeField) * 1024;
                                break;
                            case "MB":
                                sizeField = "" + parseInt(sizeField) * 1024 * 1024;
                                break;
                            case "GB":
                                sizeField = "" + parseInt(sizeField) * 1024 * 1024 * 1024;
                                break;
                            case "TB":
                                sizeField = "" + parseInt(sizeField) * 1024 * 1024 * 1024 * 1024;
                                break;
                            case "PB":
                                sizeField = "" + parseInt(sizeField) * 1024 * 1024 * 1024 * 1024 * 1024;
                                break;
                        }
                    }
                    if ((sizeRadio2) && (sizeTypeFieldLow != "") && (sizeTypeFieldHigh != "")) {
                        sizeField = "";
                        switch (sizeTypeFieldLow) {
                            case "Byte":
                                break;
                            case "KB":
                                sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024;
                                break;
                            case "MB":
                                sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024 * 1024;
                                break;
                            case "GB":
                                sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024 * 1024 * 1024;
                                break;
                            case "TB":
                                sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024 * 1024 * 1024 * 1024;
                                break;
                            case "PB":
                                sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024 * 1024 * 1024 * 1024 * 1024;
                                break;
                        }
                        switch (sizeTypeFieldHigh) {
                            case "Byte":
                                break;
                            case "KB":
                                sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024;
                                break;
                            case "MB":
                                sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024 * 1024;
                                break;
                            case "GB":
                                sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024 * 1024 * 1024;
                                break;
                            case "TB":
                                sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024 * 1024 * 1024 * 1024;
                                break;
                            case "PB":
                                sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024 * 1024 * 1024 * 1024 * 1024;
                                break;
                        }
                    }
                    if (!(((sizeRadio1) && (sizeTypeField != "")) || ((sizeRadio2) && (sizeTypeFieldLow != "") && (sizeTypeFieldHigh != "")))) {
                        this.loadingFlag = false;
                        this.alerts.push({ msg: 'אנא בחר את סוג הגודל שבעזרתו תרצה לחפש.', type: 2 });
                    }
                }
                else {
                    sizeFieldLow = "";
                    sizeFieldHigh = "";
                    sizeField = "";
                }
                console.log("sizeField=" + sizeField + " sizeFieldLow=" + sizeFieldLow + " sizeFieldHigh=" + sizeFieldHigh);
                if (this.loadingFlag) {
                    //Parameters obj
                    var params = new http_1.URLSearchParams();
                    params.set('name', name);
                    params.set('type', type);
                    params.set('server', server.toUpperCase());
                    params.set('size', sizeField);
                    params.set('date', dateField);
                    params.set('sizeRangeLow', sizeFieldLow);
                    params.set('sizeRangeHigh', sizeFieldHigh);
                    params.set('dateRangeLow', dateFieldLow);
                    params.set('dateRangeHigh', dateFieldHigh);
                    //get the files arr from the service
                    this.fileService.getFiles(params)
                        .then(function (data /*File[]*/) {
                        if (data.name == "MongoError")
                            _this.errorFlag = true;
                        else {
                            if (data.length > 0) {
                                _this.files = data;
                                _this.length = _this.files.length;
                                if (_this.alerts.length > 0)
                                    _this.alerts.splice(0, _this.alerts.length);
                                _this.isResult = true;
                                _this.loadingFlag = false;
                            }
                            else {
                                //warning=1
                                //danger=2
                                //success=3
                                _this.loadingFlag = false;
                                if ((name != "") || (type != "") || (server != "")) {
                                    if (server == "")
                                        _this.alerts.push({ msg: 'אנא בחר את השרת שבו תרצה לחפש.', type: 2 });
                                    else
                                        _this.alerts.push({
                                            msg: 'לא נמצאה אף תוצאה, נסה לחפש שוב או לחפש בעזרת חיפוש מתקדם.',
                                            type: 1
                                        });
                                }
                                else
                                    _this.alerts.push({ msg: 'לא הוכנס שום ערך.', type: 2 });
                            }
                        }
                    });
                }
            }
        }
    };
    AdvanceSearchComponent.prototype.advanceSearch = function () {
        var regularSearch = document.getElementById("regular");
        var regularSearchBTN = document.getElementById("simpleSearchBTN");
        regularSearch.className = "hidden";
        regularSearchBTN.className = "hidden";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "visible";
    };
    AdvanceSearchComponent.prototype.simpleSearch = function () {
        var regularSearch = document.getElementById("regular");
        var regularSearchBTN = document.getElementById("simpleSearchBTN");
        regularSearch.className = "visible";
        regularSearchBTN.className = "visible";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "hidden";
    };
    //function enable/disable the radio input
    AdvanceSearchComponent.prototype.dateClickCheck = function (radio1ID, radio2ID, regularInputID, lowInputID, highInputID) {
        var radio1Field = document.getElementById(radio1ID);
        var radio2Field = document.getElementById(radio2ID);
        var regularField = document.getElementById(regularInputID);
        var lowInputField = document.getElementById(lowInputID);
        var highInputField = document.getElementById(highInputID);
        if ((radio1Field.hasAttribute("disabled")) && (radio2Field.hasAttribute("disabled"))) {
            //enable the radio fields
            radio1Field.removeAttribute("disabled");
            radio2Field.removeAttribute("disabled");
            //enable the input field
            if (radio1Field.checked)
                regularField.removeAttribute("disabled");
            if (radio2Field.checked) {
                lowInputField.removeAttribute("disabled");
                highInputField.removeAttribute("disabled");
            }
        }
        else {
            //disable the radio fields
            radio1Field.setAttribute("disabled", "disabled");
            radio2Field.setAttribute("disabled", "disabled");
            //disable the input field
            if (!(regularField.checked))
                regularField.setAttribute("disabled", "disabled");
            if (!(lowInputField.checked)) {
                lowInputField.setAttribute("disabled", "disabled");
                highInputField.setAttribute("disabled", "disabled");
            }
        }
    };
    //function enable/disable the radio input
    /*sizeClickCheck(radio1ID, radio2ID, input1ID, lowInputID, input3ID)*/
    AdvanceSearchComponent.prototype.sizeClickCheck = function (radio1ID, radio2ID, regularInputID, regularInputTypeID, lowInputID, lowInputTypeID, highInputID, highInputTypeID) {
        var radio1Field = document.getElementById(radio1ID);
        var radio2Field = document.getElementById(radio2ID);
        var regularField = document.getElementById(regularInputID);
        var regularTypeField = document.getElementById(regularInputTypeID);
        var lowInputField = document.getElementById(lowInputID);
        var lowInputTypeField = document.getElementById(lowInputTypeID);
        var highInputField = document.getElementById(highInputID);
        var highInputTypeField = document.getElementById(highInputTypeID);
        if ((radio1Field.hasAttribute("disabled")) && (radio2Field.hasAttribute("disabled"))) {
            //enable the radio fields
            radio1Field.removeAttribute("disabled");
            radio2Field.removeAttribute("disabled");
            //enable the input field
            if (radio1Field.checked) {
                regularField.removeAttribute("disabled");
                regularTypeField.removeAttribute("disabled");
            }
            if (radio2Field.checked) {
                lowInputField.removeAttribute("disabled");
                highInputField.removeAttribute("disabled");
                lowInputTypeField.removeAttribute("disabled");
                highInputTypeField.removeAttribute("disabled");
            }
        }
        else {
            //disable the radio fields
            radio1Field.setAttribute("disabled", "disabled");
            radio2Field.setAttribute("disabled", "disabled");
            //disable the input field
            if (!(regularField.checked)) {
                regularField.setAttribute("disabled", "disabled");
                regularTypeField.setAttribute("disabled", "disabled");
            }
            if (!(lowInputField.checked)) {
                lowInputField.setAttribute("disabled", "disabled");
                highInputField.setAttribute("disabled", "disabled");
                lowInputTypeField.setAttribute("disabled", "disabled");
                highInputTypeField.setAttribute("disabled", "disabled");
            }
        }
    };
    //function enable/disable the input field
    AdvanceSearchComponent.prototype.dateRadioCheck = function (click, regularInputID, lowInputID, highInputID) {
        var regularField = document.getElementById(regularInputID);
        var lowInputField = document.getElementById(lowInputID);
        var highInputField = document.getElementById(highInputID);
        if (click == 1) {
            regularField.removeAttribute("disabled");
            lowInputField.setAttribute("disabled", "disabled");
            highInputField.setAttribute("disabled", "disabled");
        }
        else {
            regularField.setAttribute("disabled", "disabled");
            lowInputField.removeAttribute("disabled");
            highInputField.removeAttribute("disabled");
        }
    };
    //function enable/disable the input field
    AdvanceSearchComponent.prototype.sizeRadioCheck = function (click, regularInputID, regularInputTypeID, lowInputID, lowInputTypeID, highInputID, highInputTypeID) {
        var regularField = document.getElementById(regularInputID);
        var regularTypeField = document.getElementById(regularInputTypeID);
        var lowInputField = document.getElementById(lowInputID);
        var lowInputTypeField = document.getElementById(lowInputTypeID);
        var highInputField = document.getElementById(highInputID);
        var highInputTypeField = document.getElementById(highInputTypeID);
        if (click == 1) {
            regularField.removeAttribute("disabled");
            regularTypeField.removeAttribute("disabled");
            lowInputField.setAttribute("disabled", "disabled");
            highInputField.setAttribute("disabled", "disabled");
            lowInputTypeField.setAttribute("disabled", "disabled");
            highInputTypeField.setAttribute("disabled", "disabled");
        }
        else {
            regularField.setAttribute("disabled", "disabled");
            regularTypeField.setAttribute("disabled", "disabled");
            lowInputField.removeAttribute("disabled");
            highInputField.removeAttribute("disabled");
            lowInputTypeField.removeAttribute("disabled");
            highInputTypeField.removeAttribute("disabled");
        }
    };
    return AdvanceSearchComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AdvanceSearchComponent.prototype, "files", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AdvanceSearchComponent.prototype, "length", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AdvanceSearchComponent.prototype, "isResult", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AdvanceSearchComponent.prototype, "loadingFlag", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AdvanceSearchComponent.prototype, "alerts", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AdvanceSearchComponent.prototype, "errorFlag", void 0);
AdvanceSearchComponent = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'advanceSearch',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/advance-search.component.html',
        //the style of the code
        styleUrls: ['./app/styles/advance-search.component.css'],
        providers: [file_service_1.FileService]
    })
    //the class of this new component
    ,
    __metadata("design:paramtypes", [file_service_1.FileService])
], AdvanceSearchComponent);
exports.AdvanceSearchComponent = AdvanceSearchComponent;
//# sourceMappingURL=advance-search.component.js.map