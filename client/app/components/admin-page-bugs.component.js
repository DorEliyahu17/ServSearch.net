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
//import the service "PagerService" from the file "../services/pager.service"
var admin_page_service_1 = require("../services/admin-page.service");
// Add the RxJS Observable operators.
require("../rxjs/rxjs-operators");
//create new component
var AdminPageBugsComponent = (function () {
    function AdminPageBugsComponent(adminPageService) {
        this.adminPageService = adminPageService;
        this.isbugs = false;
        this.alerts = [];
        this.indexArr = [];
        this.bugsToDeleteArr = [];
    }
    //warning=1
    //danger=2
    //success=3
    AdminPageBugsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alerts = [];
        this.adminPageService.getBugs().then(function (data) {
            if (data.name == "MongoError")
                _this.alerts.push({
                    msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
                    type: 2
                });
            else {
                if (data.length > 0) {
                    _this.bugs = data;
                    _this.length = _this.bugs.length;
                    _this.isbugs = true;
                }
                else
                    _this.alerts.push({
                        msg: 'לא דווחו באגים למערכת.',
                        type: 3
                    });
            }
        });
    };
    AdminPageBugsComponent.prototype.deleteBugs = function () {
        var _this = this;
        if (this.bugs.length != 0) {
            if (this.bugsToDeleteArr.length == 0) {
                this.alerts = [];
                this.alerts.push({
                    msg: 'לא סומנו אף באגים למחיקה!',
                    type: 2
                });
            }
            else {
                this.alerts = [];
                this.isbugs = false;
                //Parameters obj
                var params = new http_1.URLSearchParams();
                //params.set('bugs', this.bugs);
                for (var i = 0; i <= this.bugsToDeleteArr.length; i++) {
                    //in case of only one bug its create an arr
                    if (i == this.bugsToDeleteArr.length)
                        params.append('_id', '0');
                    else
                        params.append('_id', this.bugsToDeleteArr[i]);
                }
                this.adminPageService.deleteBugs(params).then(function (data) {
                    if (data.name == "MongoError")
                        _this.alerts.push({
                            msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
                            type: 2
                        });
                    else {
                        _this.bugs = data;
                        if (data.length > 0) {
                            _this.bugs = data;
                            _this.length = _this.bugs.length;
                            _this.isbugs = true;
                        }
                        else
                            _this.alerts.push({
                                msg: 'לא דווחו באגים למערכת.',
                                type: 3
                            });
                    }
                });
            }
        }
        else {
            this.alerts = [];
            this.alerts.push({
                msg: 'לא דווחו באגים למערכת.',
                type: 3
            });
        }
    };
    return AdminPageBugsComponent;
}());
AdminPageBugsComponent = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'admin-bugs',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/admin-page-bugs.component.html',
        styleUrls: ['./app/styles/admin-page-bugs.component.css']
    }),
    __metadata("design:paramtypes", [admin_page_service_1.AdminPageService])
], AdminPageBugsComponent);
exports.AdminPageBugsComponent = AdminPageBugsComponent;
//# sourceMappingURL=admin-page-bugs.component.js.map