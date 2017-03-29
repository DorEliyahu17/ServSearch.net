"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import the routes declare in order to create the routes of the app
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//import the Components
var simple_search_component_1 = require("../components/simple-search.component");
var login_component_1 = require("../components/login.component");
var admin_page_home_component_1 = require("../components/admin-page-home.component");
var bug_report_component_1 = require("../components/bug-report.component");
var admin_page_bugs_component_1 = require("../components/admin-page-bugs.component");
var admin_page_todo_component_1 = require("../components/admin-page-todo.component");
var admin_page_status_component_1 = require("../components/admin-page-status.component");
//let params: URLSearchParams = new URLSearchParams();
var routes = [
    //Home page
    {
        path: '',
        redirectTo: '/search',
        pathMatch: 'full'
    },
    //Search page
    {
        path: 'search',
        component: simple_search_component_1.SimpleSearchComponent
    },
    //Bug report Page
    {
        path: 'bugReport',
        component: bug_report_component_1.BugReportComponent
    },
    //Admin login page
    {
        path: 'adminLogin',
        component: login_component_1.LoginComponent
    },
    //Admin page
    {
        path: 'adminPage/home',
        component: admin_page_home_component_1.AdminPageHomeComponent
    },
    //Admin page - bugs
    {
        path: 'adminPage/bugs',
        component: admin_page_bugs_component_1.AdminPageBugsComponent
    },
    //Admin page - to-do
    {
        path: 'adminPage/todo',
        component: admin_page_todo_component_1.AdminPageTodoComponent
    },
    //Admin page - DBs status
    {
        path: 'adminPage/status',
        component: admin_page_status_component_1.AdminPageStatusComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map