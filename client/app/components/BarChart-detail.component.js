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
var BarChartDetailComponent = (function () {
    function BarChartDetailComponent() {
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
    }
    // events
    BarChartDetailComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    BarChartDetailComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    BarChartDetailComponent.prototype.randomize = function () {
        // Only Change 3 values
        var data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40
        ];
        var clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    };
    return BarChartDetailComponent;
}());
BarChartDetailComponent = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'BarChart-detail',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/BarChart-detail.component.html'
    })
], BarChartDetailComponent);
exports.BarChartDetailComponent = BarChartDetailComponent;
//# sourceMappingURL=BarChart-detail.component.js.map