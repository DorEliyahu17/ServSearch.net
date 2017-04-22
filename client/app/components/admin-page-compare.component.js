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
var compare_service_1 = require("../services/compare.service");
//create new component
var AdminPageCompareComponent = (function () {
    function AdminPageCompareComponent(compareService) {
        this.compareService = compareService;
        this.alerts = [];
    }
    //warning=1
    //danger=2
    //success=3
    AdminPageCompareComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alerts = [];
        this.compareService.getSortedScanResult().then(function (data) {
            if (data.name == "MongoError")
                _this.alerts.push({
                    msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
                    type: 2
                });
            else {
                if (data.length > 0) {
                    _this.scanResults = data;
                }
                else
                    _this.alerts.push({
                        msg: 'לא דווחו למערכת אף דוחות סריקה.',
                        type: 3
                    });
            }
        });
    };
    return AdminPageCompareComponent;
}());
AdminPageCompareComponent = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'admin-status',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/admin-page-compare.component.html',
        styleUrls: ['./app/styles/admin-page-compare.component.css']
    }),
    __metadata("design:paramtypes", [compare_service_1.CompareService])
], AdminPageCompareComponent);
exports.AdminPageCompareComponent = AdminPageCompareComponent;
//# sourceMappingURL=admin-page-compare.component.js.map