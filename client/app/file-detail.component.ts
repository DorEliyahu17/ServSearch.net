//import the component declare in order to create a new one
import { Component, Input, OnInit , OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import the class "Hero" from the file "./hero"
import { File } from './file';

//import the service "HeroService" from the file "./hero.service"
import { FileService } from './file.service';

//create new component
@Component({
    //his label in the HTML code
    selector: 'my-file-detail',
    //the code that will be read when the component will be called
    templateUrl: 'app/pages/file-detail.component.html',
    styleUrls: ['app/styles/file-detail.component.css'],
})

//the class of this new component
export class FileDetailComponent implements /*OnInit*/ OnChanges{
    @Input() files: File[];

    constructor(private fileService: FileService, private route: ActivatedRoute){}

    ngOnChanges() {}

    goBack(): void{
        //visible and hidden change
        var regularSearch = document.getElementById("regular");
        regularSearch.className = "hidden";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "visible";
    }
}