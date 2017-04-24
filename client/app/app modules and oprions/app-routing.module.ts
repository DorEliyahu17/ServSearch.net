//import the routes declare in order to create the routes of the app
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import the Components
import { SimpleSearchComponent } from '../components/simple-search.component'
import { LoginComponent } from '../components/login.component'
import { AdminPageHomeComponent } from '../components/admin-page-home.component'
import { BugReportComponent } from '../components/bug-report.component';
import { AdminPageBugsComponent } from '../components/admin-page-bugs.component';
import { AdminPageTodoComponent } from '../components/admin-page-todo.component';
import { AdminPageCompareComponent } from '../components/admin-page-compare.component';

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
        component: AdminPageHomeComponent
    },

    //Admin page - bugs
    {
        path: 'adminPage/bugs',
        component: AdminPageBugsComponent
    },

    //Admin page - to-do
    {
        path: 'adminPage/todo',
        component: AdminPageTodoComponent
    },

    //Admin page - DBs status
    {
        path: 'adminPage/compare',
        component: AdminPageCompareComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
