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
var SimpleSearchComponent = (function () {
    function SimpleSearchComponent(fileService) {
        this.fileService = fileService;
        this.advanceFlag = false;
        this.errorFlag = false;
        this.alerts = [];
        this.serverNames = [];
        this.isResult = false;
        this.loadingFlag = false;
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
        this.fileService.getServerNames().then(function (data) {
            if (data.name == "MongoError")
                _this.errorFlag = true;
            else
                _this.serverNames = data;
        });
    };
    SimpleSearchComponent.prototype.search = function () {
        var _this = this;
        this.advanceFlag = false;
        this.isResult = false;
        this.loadingFlag = true;
        this.files = [];
        this.length = 0;
        if (this.alerts.length > 0)
            this.alerts.splice(0, this.alerts.length);
        var i;
        var name = document.getElementById("FileName").value;
        var type = document.getElementById("FileType").value;
        var server = document.getElementById("FileServer").value;
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
                //Parameters obj
                var params = new http_1.URLSearchParams();
                params.set('name', name);
                params.set('type', type);
                params.set('server', server.toUpperCase());
                params.set('size', "");
                params.set('date', "");
                params.set('sizeRangeLow', "");
                params.set('sizeRangeHigh', "");
                params.set('dateRangeLow', "");
                params.set('dateRangeHigh', "");
                //get the files arr from the service
                this.fileService.getFiles(params)
                    .then(function (data /*File[]*/) {
                    if (data.name == "MongoError") {
                        _this.errorFlag = true;
                        _this.loadingFlag = false;
                    }
                    else {
                        if (data.length > 0) {
                            _this.files = data;
                            _this.length = _this.files.length;
                            if (_this.alerts.length > 0)
                                _this.alerts.splice(0, _this.alerts.length);
                            _this.isResult = true;
                            _this.advanceFlag = true;
                            _this.loadingFlag = false;
                            //visible and hidden change
                            //var resultSearch = document.getElementById("result");
                            //resultSearch.className = "visible";
                            //this.isResult=true;
                        }
                        else {
                            //warning=1
                            //danger=2
                            //success=3
                            _this.loadingFlag = false;
                            if ((name != "") || (type != "") || (server != "")) {
                                if (server == "")
                                    _this.alerts.push({ msg: 'אנא בחר את השרת שבו תרצה לחפש.', type: 2 });
                                else {
                                    _this.alerts.push({
                                        msg: 'לא נמצאה אף תוצאה, נסה לחפש שוב או לחפש בעזרת חיפוש מתקדם.',
                                        type: 1
                                    });
                                    _this.advanceFlag = true;
                                }
                            }
                            else
                                _this.alerts.push({ msg: 'לא הוכנס שום ערך.', type: 2 });
                        }
                    }
                });
            }
        }
    };
    return SimpleSearchComponent;
}());
SimpleSearchComponent = __decorate([
    core_1.Component({
        selector: 'simple-search',
        templateUrl: './app/pages/simple-search.component.html',
        styleUrls: ['./app/styles/simple-search.component.css'],
        providers: [file_service_1.FileService]
    }),
    __metadata("design:paramtypes", [file_service_1.FileService])
], SimpleSearchComponent);
exports.SimpleSearchComponent = SimpleSearchComponent;
//# sourceMappingURL=simple-search.component.js.map