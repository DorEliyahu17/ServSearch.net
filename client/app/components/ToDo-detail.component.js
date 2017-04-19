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
//import the service "PagerService" from the bug "../services/pager.service"
var pager_service_1 = require("../services/pager.service");
//create new component
var ToDoDetailComponent = (function () {
    function ToDoDetailComponent(pagerService) {
        this.pagerService = pagerService;
        this.indexArr = [];
        //pager vars
        // dummy array of items to be paged
        this.ToDosArr = [];
        // pager object
        this.pager = {};
    }
    ToDoDetailComponent.prototype.ngOnChanges = function () {
        this.ToDosArr = [];
        for (var i = 0; i < this.length; i++) {
            this.ToDosArr[i] = this.ToDos[i];
            this.indexArr[i] = i + 1;
        }
        // initialize to page 1
        this.setPage(1);
    };
    ToDoDetailComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.ToDosArr.length, page);
        // get current page of items
        this.pagedItems = this.ToDosArr.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    ToDoDetailComponent.prototype.check = function (index1) {
        var j = 0, flag = false, bugIndex = 0;
        for (j = 0; j < this.ToDosToDeleteArr.length; j++) {
            if (this.ToDosToDeleteArr[j] == this.ToDosArr[index1]._id) {
                flag = true;
                bugIndex = j;
            }
        }
        if (flag == false)
            this.ToDosToDeleteArr.push(this.ToDosArr[index1]._id);
        else
            this.ToDosToDeleteArr.splice(bugIndex, 1);
    };
    /*ask about that*/
    ToDoDetailComponent.prototype.isChecked = function (id) {
        var toCheck = document.getElementById(id);
        if (toCheck.hasAttribute("checked"))
            toCheck.removeAttribute("checked");
        else
            toCheck.setAttribute("checked", "checked");
    };
    return ToDoDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ToDoDetailComponent.prototype, "ToDos", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ToDoDetailComponent.prototype, "length", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ToDoDetailComponent.prototype, "ToDosToDeleteArr", void 0);
ToDoDetailComponent = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'ToDo-detail',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/ToDo-detail.component.html',
        styleUrls: ['./app/styles/ToDo-detail.component.css'],
    })
    //the class of this new component
    ,
    __metadata("design:paramtypes", [pager_service_1.PagerService])
], ToDoDetailComponent);
exports.ToDoDetailComponent = ToDoDetailComponent;
//# sourceMappingURL=ToDo-detail.component.js.map