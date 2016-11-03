//import the routes declare in order to create the routes of the app
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import the Components
import { SimpleSearchComponent } from './simple-search.component'
import { AdvanceSearchComponent } from './advance-search.component'
import { FileDetailComponent } from './file-detail.component';

const appRoutes: Routes = [
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
        path: '?:name&:type&:server',
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
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);