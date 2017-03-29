//import the component declare in order to create a new one
import { Component, Input, OnChanges } from '@angular/core';

//import the class "File" from the file "../object modules/file"
import { File } from '../object modules/file';

//import the service "PagerService" from the file "../services/pager.service"
import { PagerService } from '../services/pager.service'

//create new component
@Component({
    //his label in the HTML code
    selector: 'file-detail',
    //the code that will be read when the component will be called
    templateUrl: './app/pages/file-detail.component.html',
    styleUrls: ['./app/styles/file-detail.component.css'],
})

//the class of this new component
export class FileDetailComponent implements OnChanges {
    @Input() files: File[];
    @Input() length: number;
    indexArr:Array<any>=[];
    //pager vars
    // dummy array of items to be paged
    private filesArr:Array<any>=[];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private pagerService: PagerService){}

    ngOnChanges() {
        this.filesArr=[];
        for(var i=0;i<this.length;i++) {
            this.filesArr[i] = this.files[i];
            this.indexArr[i] = i+1;
        }
        // initialize to page 1
        this.setPage(1);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.filesArr.length, page);

        // get current page of items
        this.pagedItems = this.filesArr.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    goBack(): void{
        //visible and hidden change
        var regularSearch = document.getElementById("regular");
        regularSearch.className = "hidden";
        var advanceSearch = document.getElementById("advance");
        advanceSearch.className = "visible";
    }
}