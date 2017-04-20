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
var AdminPageTodoComponent = (function () {
    function AdminPageTodoComponent(adminPageService) {
        this.adminPageService = adminPageService;
        this.isToDos = false;
        this.alerts = [];
        this.indexArr = [];
        this.ToDosToDeleteArr = [];
    }
    //warning=1
    //danger=2
    //success=3
    AdminPageTodoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alerts = [];
        this.adminPageService.getToDos().then(function (data) {
            if (data.name == "MongoError")
                _this.alerts.push({
                    msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
                    type: 2
                });
            else {
                if (data.length > 0) {
                    _this.ToDos = data;
                    _this.length = _this.ToDos.length;
                    _this.isToDos = true;
                }
                else
                    _this.alerts.push({
                        msg: 'לא נשארו משימות לביצוע מדווחות במערכת.',
                        type: 3
                    });
            }
        });
    };
    AdminPageTodoComponent.prototype.deleteToDos = function () {
        var _this = this;
        if (this.ToDos.length != 0) {
            if (this.ToDosToDeleteArr.length == 0) {
                this.alerts = [];
                this.alerts.push({
                    msg: 'לא סומנו אף באגים למחיקה!',
                    type: 2
                });
            }
            else {
                this.alerts = [];
                this.isToDos = false;
                //Parameters obj
                var params = new http_1.URLSearchParams();
                //params.set('ToDos', this.ToDos);
                for (var i = 0; i <= this.ToDosToDeleteArr.length; i++) {
                    //in case of only one To-Do its create an arr
                    if (i == this.ToDosToDeleteArr.length)
                        params.append('_id', '0');
                    else
                        params.append('_id', this.ToDosToDeleteArr[i]);
                }
                this.adminPageService.deleteToDos(params).then(function (data) {
                    if (data.name == "MongoError")
                        _this.alerts.push({
                            msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
                            type: 2
                        });
                    else {
                        _this.ToDos = data;
                        if (data.length > 0) {
                            _this.ToDos = data;
                            _this.length = _this.ToDos.length;
                            _this.isToDos = true;
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
    AdminPageTodoComponent.prototype.addToDo = function () {
        var _this = this;
        this.alerts = [];
        var description = document.getElementById("description").value;
        //date[0]=year, date[1]=month, date[2]=day
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/').split('/');
        if (description != "") {
            //Parameters obj
            var params = new http_1.URLSearchParams();
            params.set('description', description);
            params.set('insertDate', date[2] + "." + date[1] + "." + date[0]);
            description = "";
            //warning=1
            //danger=2
            //change to insertToDo
            this.adminPageService.insertToDo(params).then(function (data) {
                if (data.name == "MongoError")
                    _this.alerts.push({
                        msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
                        type: 2
                    });
                else {
                    _this.ToDos = data;
                    if (data.length > 0) {
                        _this.ToDos = data;
                        _this.length = _this.ToDos.length;
                        _this.isToDos = true;
                    }
                    else
                        _this.alerts.push({
                            msg: 'לא דווחו משימות לביצע למערכת.',
                            type: 3
                        });
                }
            });
        }
        else
            this.alerts.push({
                msg: 'אנא מלא את כל ההקריטריונים!',
                type: 2
            });
    };
    return AdminPageTodoComponent;
}());
AdminPageTodoComponent = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'admin-todo',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/admin-page-todo.component.html',
        styleUrls: ['./app/styles/admin-page-todo.component.css']
    }),
    __metadata("design:paramtypes", [admin_page_service_1.AdminPageService])
], AdminPageTodoComponent);
exports.AdminPageTodoComponent = AdminPageTodoComponent;
//# sourceMappingURL=admin-page-todo.component.js.map