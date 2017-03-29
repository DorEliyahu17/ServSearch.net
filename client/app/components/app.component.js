"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import the component declare in order to create a new one
var core_1 = require("@angular/core");
// Add the RxJS Observable operators.
require("../rxjs/rxjs-operators");
//create new component
var AppComponent = (function () {
    function AppComponent() {
        this.draw = false;
        this.title = 'ServSearch.net';
    }
    AppComponent.prototype.ngOnInit = function () {
        var location, temp;
        temp = window.location.href.split("/");
        location = temp[3];
        if (location == "adminPage") {
            this.draw = true;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'main',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/app.component.html',
        styleUrls: ['./app/styles/app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map