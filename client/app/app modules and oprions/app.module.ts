//import the rxjs extensions
import '../rxjs/rxjs-extensions';

//import the object modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

//import the components and services
import { AppComponent }  from '../components/app.component';
import { SimpleSearchComponent } from '../components/simple-search.component';
import { AdvanceSearchComponent } from '../components/advance-search.component';
import { FileDetailComponent } from '../components/file-detail.component';
import { BugReportComponent } from '../components/bug-report.component';
import { LoginComponent } from '../components/login.component'
import { AdminPageHomeComponent } from '../components/admin-page-home.component';
import { SideNavComponent } from '../components/sideNav.component';
import { AdminPageBugsComponent } from '../components/admin-page-bugs.component';
import { BugDetailComponent } from '../components/bug-detail.component';
import { AdminPageTodoComponent } from '../components/admin-page-todo.component';
import { ToDoDetailComponent } from '../components/ToDo-detail.component';
import { AdminPageStatusComponent } from '../components/admin-page-status.component';

import { FileService } from '../services/file.service';
import { PagerService } from '../services/pager.service';
import { LoginService } from '../services/login.service';
import { AdminPageService } from '../services/admin-page.service';
import { BugReportService } from '../services/bug-report.service';

//import the routes
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  //import the object modules to the project
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    JsonpModule
  ],
  //declaration the components in the project
  declarations: [
    AppComponent,
    SimpleSearchComponent,
    AdvanceSearchComponent,
    FileDetailComponent,
    BugReportComponent,
    LoginComponent,
    SideNavComponent,
    AdminPageHomeComponent,
    AdminPageBugsComponent,
    BugDetailComponent,
    AdminPageTodoComponent,
    ToDoDetailComponent,
    AdminPageStatusComponent
  ],
  providers: [
    FileService,
    PagerService,
    LoginService,
    AdminPageService,
    BugReportService
  ],
  //bootstrap the main component
  bootstrap: [ AppComponent ]
})
export class AppModule { }