//import the routes declare in order to create the routes of the app
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {URLSearchParams, /*QueryEncoder*/} from '@angular/http';

//import the Components
import { SimpleSearchComponent } from './simple-search.component'
import { AdvanceSearchComponent } from './advance-search.component'
import { FileDetailComponent } from './file-detail.component';

let params: URLSearchParams = new URLSearchParams();

const routes: Routes = [
    {
        //advance Search
        path: 'advanceSearch',
        component: AdvanceSearchComponent
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
        component: SimpleSearchComponent
    },
    {
        //Search resault of all variables

        path: 'res',
        component: FileDetailComponent
    }
    /*
    {
        //Search resault of all variables
        path: 'resault/:name/:type/:server',
        component: FileDetailComponent
    },
    {
        //Search resault without type
        path: 'resault/:name/:server',
        component: FileDetailComponent
    },
    {
        //Search resault without server
        path: 'resault/:name/:type',
        component: FileDetailComponent
    },
    {
        //Search resault without name
        path: 'resault/:type/:server',
        component: FileDetailComponent
    },
    {
        //Search resault only name
        path: 'resault/:name',
        component: FileDetailComponent
    },
    {
        //Search resault only type
        path: 'resault/:type',
        component: FileDetailComponent
    },
    {
        //Search resault only server
        path: 'resault/:server',
        component: FileDetailComponent
    }*/
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
