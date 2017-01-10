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
//import the rxjs extensions
require('../rxjs/rxjs-extensions');
//import the object modules
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
//import the components and services
var app_component_1 = require('../components/app.component');
var simple_search_component_1 = require('../components/simple-search.component');
var advance_search_component_1 = require('../components/advance-search.component');
var login_component_1 = require('../components/login.component');
var file_detail_component_1 = require('../components/file-detail.component');
var file_service_1 = require('../services/file.service');
var pager_service_1 = require('../services/pager.service');
var login_service_1 = require('../services/login.service');
//import the routes
var app_routing_module_1 = require('./app-routing.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            //import the object modules to the project
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                http_1.JsonpModule
            ],
            //declaration the components in the project
            declarations: [
                app_component_1.AppComponent,
                simple_search_component_1.SimpleSearchComponent,
                advance_search_component_1.AdvanceSearchComponent,
                file_detail_component_1.FileDetailComponent,
                login_component_1.LoginComponent
            ],
            providers: [
                file_service_1.FileService,
                pager_service_1.PagerService,
                login_service_1.LoginService
            ],
            //bootstrap the main component
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map