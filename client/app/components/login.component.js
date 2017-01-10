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
var http_1 = require("@angular/http");
//import the class "File" from the file "./file"
var user_1 = require('../object modules/user');
//import the service "FileService" from the file "./file.service"
var login_service_1 = require('../services/login.service');
//create new component
var LoginComponent = (function () {
    function LoginComponent(loginService) {
        this.loginService = loginService;
        this.user = new user_1.User();
    }
    LoginComponent.prototype.login = function () {
        var userName = document.getElementById("userName").value;
        var password = document.getElementById("password").value;
        //Parameters obj
        var params = new http_1.URLSearchParams();
        params.set('userName', userName);
        params.set('password', password);
        this.loginService.getAdmin(params).then(function (data) {
            /*var i;
            for (i = 0; i < data.length; i++) {*/
            if (data[0] != undefined)
                console.log("success login");
            else
                console.log("wrong user name or password");
            /*if ((data[0].userName == userName) && (data[0].password == password)) {
                console.log("data.userName="+data[0].userName+" data.password="+data[0].password);
            }*/
            //}
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            //his label in the HTML code
            selector: 'login',
            //the code that will be read when the component will be called
            templateUrl: './app/pages/login.component.html',
            //the style of the code
            styleUrls: ['./app/styles/login.component.css'],
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map