//import the modules 
import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';

import{ InMemoryDataService }  from './in-memory-data.service';

//import the components
import { AppComponent }  from './app.component';
import { SimpleSearchComponent } from './simple-search.component'
import { AdvanceSearchComponent } from './advance-search.component'
import { FileDetailComponent } from './file-detail.component';

import { FileService } from './file.service';

//import the routes
import { AppRoutingModule }     from './app-routing.module';
import { routing } from './app.routing'

@NgModule({
  //import the modules to the project
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
      /*
    routing*/
    ,JsonpModule
    //,InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  //declaration the components in the project
  declarations: [
    AppComponent,
    SimpleSearchComponent,
    AdvanceSearchComponent,
    FileDetailComponent
  ],
  providers: [
    FileService
  ],
  //bootstrap the main component
  bootstrap: [ AppComponent ]
})
export class AppModule { }