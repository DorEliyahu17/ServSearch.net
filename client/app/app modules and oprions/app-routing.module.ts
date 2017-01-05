//import the routes declare in order to create the routes of the app
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {URLSearchParams } from '@angular/http';

//import the Components
import { SimpleSearchComponent } from '../components/simple-search.component'
import { AdvanceSearchComponent } from '../components/advance-search.component'
import { FileDetailComponent } from '../components/file-detail.component';

let params: URLSearchParams = new URLSearchParams();

const routes: Routes = [
    {
        //Home Page
        path: '',
        redirectTo: '/simpleSearch',
        pathMatch: 'full'
    },
    {
        //Simple Search
        path: 'simpleSearch',
        component: SimpleSearchComponent
    }/*,
    {
        //advance Search
        path: 'advanceSearch',
        component: AdvanceSearchComponent
    },
    {
        //Search resault of all variables

        path: 'res',
        component: FileDetailComponent
    }*/
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
