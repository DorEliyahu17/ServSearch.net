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
var CompareDetailComponent2 = (function () {
    function CompareDetailComponent2() {
        this.isComplete = false;
    }
    CompareDetailComponent2.prototype.search = function () {
        var name = document.getElementById("SearchName2").value.split(".");
        name = name[0].split(" ");
        console.log(name);
        this.resultChecked = this.scanResults[name[0]];
        this.isComplete = true;
    };
    return CompareDetailComponent2;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CompareDetailComponent2.prototype, "scanResults", void 0);
CompareDetailComponent2 = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'compare-detail2',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/compare-detail2.component.html'
    })
], CompareDetailComponent2);
exports.CompareDetailComponent2 = CompareDetailComponent2;
//# sourceMappingURL=compare-detail2.component.js.map