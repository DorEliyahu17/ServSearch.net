//import the component declare in order to create a new one
import {Component, Input} from '@angular/core';
import { URLSearchParams } from "@angular/http";
import {AdminPageService} from "../services/admin-page.service";



//create new component
@Component({
    //his label in the HTML code
    selector: 'admin-page',
    //the code that will be read when the component will be called
    templateUrl: './app/pages/admin-page-home.component.html',
    //the style of the code
    styleUrls: ['./app/styles/admin-page-home.component.css'],
    providers: [AdminPageService]
})

//the class of this new component
export class AdminPageComponent {

    constructor(private adminPageService: AdminPageService) {}
}