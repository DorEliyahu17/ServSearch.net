//import the rxjs extensions
import './rxjs-extensions';

//import the modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

//import the components and services
import { AppComponent }  from './app.component';
import { SimpleSearchComponent } from './simple-search.component'
import { AdvanceSearchComponent } from './advance-search.component'
import { FileDetailComponent } from './file-detail.component';
import { FileService } from './file.service';
import { PagerService } from './pager.service'

//import the routes
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  //import the modules to the project
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
    FileDetailComponent
  ],
  providers: [
    FileService,
    PagerService
  ],
  //bootstrap the main component
  bootstrap: [ AppComponent ]
})
export class AppModule { }