"use strict";
var router_1 = require('@angular/router');
//import the Components
var simple_search_component_1 = require('./simple-search.component');
var advance_search_component_1 = require('./advance-search.component');
var file_detail_component_1 = require('./file-detail.component');
var appRoutes = [
    {
        //advance Search
        path: 'advanceSearch',
        component: advance_search_component_1.AdvanceSearchComponent
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
        component: simple_search_component_1.SimpleSearchComponent
    },
    {
        //Search resault of all variables
        path: '?:name&:type&:server',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault without type
        path: 'resault/:name/:server',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault without server
        path: 'resault/:name/:type',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault without name
        path: 'resault/:type/:server',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault only name
        path: 'resault/:name',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault only type
        path: 'resault/:type',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        //Search resault only server
        path: 'resault/:server',
        component: file_detail_component_1.FileDetailComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map