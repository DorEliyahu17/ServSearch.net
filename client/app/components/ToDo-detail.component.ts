//import the component declare in order to create a new one
import { Component, Input, OnChanges } from '@angular/core';

//import the class "File" from the file "../object modules/file"
import { ToDo } from '../object modules/ToDo_item';


//import the service "PagerService" from the bug "../services/pager.service"
import { PagerService } from '../services/pager.service'

//create new component
@Component({
    //his label in the HTML code
    selector: 'ToDo-detail',
    //the code that will be read when the component will be called
    templateUrl: './app/pages/ToDo-detail.component.html',
    styleUrls: ['./app/styles/ToDo-detail.component.css'],
})

//the class of this new component
export class ToDoDetailComponent implements OnChanges {
    @Input() ToDos: ToDo[];
    @Input() length: number;
    @Input() ToDosToDeleteArr: Array<any>;
    indexArr: Array<any> = [];
    //pager vars
    // dummy array of items to be paged
    private ToDosArr: Array<any> = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private pagerService: PagerService) {
    }

    ngOnChanges() {
        this.ToDosArr = [];
        for (var i = 0; i < this.length; i++) {
            this.ToDosArr[i] = this.ToDos[i];
            this.indexArr[i] = i + 1;
        }
        // initialize to page 1
        this.setPage(1);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.ToDosArr.length, page);

        // get current page of items
        this.pagedItems = this.ToDosArr.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    check(index1: number): void {
        var j = 0, flag = false, bugIndex = 0;
        for (j = 0; j < this.ToDosToDeleteArr.length; j++) {
            if (this.ToDosToDeleteArr[j] == this.ToDosArr[index1]._id) {
                flag = true;
                bugIndex = j;
            }
        }
        if (flag == false)
            this.ToDosToDeleteArr.push(this.ToDosArr[index1]._id);
        else
            this.ToDosToDeleteArr.splice(bugIndex, 1);
    }

    /*ask about that*/
    isChecked(id: string) {
        var toCheck = document.getElementById(id);
        if (toCheck.hasAttribute("checked"))
            toCheck.removeAttribute("checked");
        else
            toCheck.setAttribute("checked", "checked");
    }

}