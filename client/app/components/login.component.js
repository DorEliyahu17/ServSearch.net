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
//import the service "FileService" from the file "./file.service"
var login_service_1 = require("../services/login.service");
//create new component
var LoginComponent = (function () {
    function LoginComponent(/*private router: Router, */ loginService) {
        this.loginService = loginService;
        this.errorFlag = false;
        this.alerts = [];
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        var userName = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        //Parameters obj
        var params = new http_1.URLSearchParams();
        params.set('userName', userName);
        params.set('password', password);
        this.loginService.getAdmin(params).then(function (data) {
            if (data.name == "MongoError")
                _this.errorFlag = true;
            else {
                if (data[0] != "")
                    window.location.href = '/adminPage/home';
                else {
                    //warning=1
                    //danger=2
                    //success=3
                    if (_this.alerts.length > 0)
                        _this.alerts.splice(0, _this.alerts.length);
                    if ((userName != "") && (password != ""))
                        _this.alerts.push({ msg: 'שם המשתמש או הסיסמה אינם נכונים.', type: 1 });
                    else
                        _this.alerts.push({ msg: 'אנא מלא את כל הפרטים.', type: 2 });
                }
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        //his label in the HTML code
        selector: 'login',
        //the code that will be read when the component will be called
        templateUrl: './app/pages/login.component.html',
        //the style of the code
        styleUrls: ['./app/styles/login.component.css'],
        providers: [login_service_1.LoginService]
    })
    //the class of this new component
    ,
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map