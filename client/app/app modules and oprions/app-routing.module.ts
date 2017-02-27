//import the routes declare in order to create the routes of the app
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {URLSearchParams } from '@angular/http';

//import the Components
import { SimpleSearchComponent } from '../components/simple-search.component'
import { LoginComponent } from '../components/login.component'
import { AdminPageComponent } from '../components/admin-page-home.component'
import { BugReportComponent } from '../components/bug-report.component';
import { AdminPageBugs } from '../components/admin-page-bugs.component';
import { AdminPageTodo } from '../components/admin-page-todo.component';
import { AdminPageStatus } from '../components/admin-page-status.component';

//let params: URLSearchParams = new URLSearchParams();

const routes: Routes = [
    //Home page
    {
        path: '',
        redirectTo: '/search',
        pathMatch: 'full'
    },

    //Search page
    {
        path: 'search',
        component: SimpleSearchComponent
    },

    //Bug report Page
    {
        path: 'bugReport',
        component: BugReportComponent
    },

    //Admin login page
    {
        path: 'adminLogin',
        component: LoginComponent
    },

    //Admin page
    {
        path: 'adminPage/home',
        component: AdminPageComponent
    },

    //Admin page - bugs
    {
        path: 'adminPage/bugs',
        component: AdminPageBugs
    },

    //Admin page - to-do
    {
        path: 'adminPage/todo',
        component: AdminPageTodo
    },

    //Admin page - DBs status
    {
        path: 'adminPage/status',
        component: AdminPageStatus
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
