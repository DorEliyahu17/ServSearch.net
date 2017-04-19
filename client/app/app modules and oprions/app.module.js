"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import the rxjs extensions
require("../rxjs/rxjs-extensions");
//import the object modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
//import the components and services
var app_component_1 = require("../components/app.component");
var simple_search_component_1 = require("../components/simple-search.component");
var advance_search_component_1 = require("../components/advance-search.component");
var file_detail_component_1 = require("../components/file-detail.component");
var bug_report_component_1 = require("../components/bug-report.component");
var login_component_1 = require("../components/login.component");
var admin_page_home_component_1 = require("../components/admin-page-home.component");
var sideNav_component_1 = require("../components/sideNav.component");
var admin_page_bugs_component_1 = require("../components/admin-page-bugs.component");
var bug_detail_component_1 = require("../components/bug-detail.component");
var admin_page_todo_component_1 = require("../components/admin-page-todo.component");
var ToDo_detail_component_1 = require("../components/ToDo-detail.component");
var admin_page_status_component_1 = require("../components/admin-page-status.component");
var file_service_1 = require("../services/file.service");
var pager_service_1 = require("../services/pager.service");
var login_service_1 = require("../services/login.service");
var admin_page_service_1 = require("../services/admin-page.service");
var bug_report_service_1 = require("../services/bug-report.service");
//import the routes
var app_routing_module_1 = require("./app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
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
            bug_report_component_1.BugReportComponent,
            login_component_1.LoginComponent,
            sideNav_component_1.SideNavComponent,
            admin_page_home_component_1.AdminPageHomeComponent,
            admin_page_bugs_component_1.AdminPageBugsComponent,
            bug_detail_component_1.BugDetailComponent,
            admin_page_todo_component_1.AdminPageTodoComponent,
            ToDo_detail_component_1.ToDoDetailComponent,
            admin_page_status_component_1.AdminPageStatusComponent
        ],
        providers: [
            file_service_1.FileService,
            pager_service_1.PagerService,
            login_service_1.LoginService,
            admin_page_service_1.AdminPageService,
            bug_report_service_1.BugReportService
        ],
        //bootstrap the main component
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map