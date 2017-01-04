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
//import the service "HeroService" from the file "./hero.service"
var pager_service_1 = require('./../services/pager.service.ts');
//create new component
var FileDetailComponent = (function () {
    function FileDetailComponent(pagerService) {
        this.pagerService = pagerService;
        this.indexArr = [];
        //pager vars
        // dummy array of items to be paged
        this.dummyItems = []; //_.range(1, 151);
        // pager object
        this.pager = {};
    }
    FileDetailComponent.prototype.ngOnChanges = function () {
        for (var i = 0; i < length; i++) {
            this.dummyItems[i] = this.files[i];
            this.indexArr[i] = i + 1;
        }
        // initialize to page 1
        this.setPage(1);
    };
    FileDetailComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.dummyItems.length, page);
        // get current page of items
        this.pagedItems = this.dummyItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    FileDetailComponent.prototype.goBack = function () {
        //visible and hidden change
        var regularSearch = document.getElementById("regular");
        regularSearch.className = "hidden";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "visible";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FileDetailComponent.prototype, "files", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileDetailComponent.prototype, "length", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileDetailComponent.prototype, "attributeName", void 0);
    FileDetailComponent = __decorate([
        core_1.Component({
            //his label in the HTML code
            selector: 'my-file-detail',
            //the code that will be read when the component will be called
            templateUrl: '../pages/file-detail.component.html',
            styleUrls: ['../styles/file-detail.component.css'],
        }), 
        __metadata('design:paramtypes', [pager_service_1.PagerService])
    ], FileDetailComponent);
    return FileDetailComponent;
}());
exports.FileDetailComponent = FileDetailComponent;
//# sourceMappingURL=file-detail.component.js.map