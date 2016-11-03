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
//import the routes declare in order to create the routes of the app
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
//import the Components
var simple_search_component_1 = require('./simple-search.component');
var advance_search_component_1 = require('./advance-search.component');
var file_detail_component_1 = require('./file-detail.component');
var routes = [
    {
        //advance Search
        path: 'advanceSearch',
        component: advance_search_component_1.AdvanceSearchComponent
    },
    {
        //Home Page
        path: '',
        redirectTo: '/simpleSearch',
        pathMatch: 'full'
    },
    {
        //Simple Search
        path: 'simpleSearch',
        component: simple_search_component_1.SimpleSearchComponent
    },
    {
        //Search resault of all variables
        path: 'resault/:name/:type/:server',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault without type
        path: 'resault/:name/:server',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault without server
        path: 'resault/:name/:type',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault without name
        path: 'resault/:type/:server',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault only name
        path: 'resault/:name',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault only type
        path: 'resault/:type',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault only server
        path: 'resault/:server',
        component: file_detail_component_1.FileDetailComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map