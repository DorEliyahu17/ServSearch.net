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
// Add the RxJS Observable operators.
require("../rxjs/rxjs-operators");
//create new component
var CompareDetailComponent1 = (function () {
    function CompareDetailComponent1() {
        this.isComplete = false;
    }
    CompareDetailComponent1.prototype.search = function () {
        var name = document.getElementById("SearchName1").value;
        this.resultChecked = this.scanResults[name[0]];
        this.isComplete = true;
    };
    return CompareDetailComponent1;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CompareDetailComponent1.prototype, "scanResults", void 0);
CompareDetailComponent1 = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'compare-detail1',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/compare-detail1.component.html'
    })
], CompareDetailComponent1);
exports.CompareDetailComponent1 = CompareDetailComponent1;
//# sourceMappingURL=compare-detail1.component.js.map