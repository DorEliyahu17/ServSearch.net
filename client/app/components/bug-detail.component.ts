//import the component declare in order to create a new one
import { Component, Input, OnChanges } from '@angular/core';

//import the class "bug" from the bug "../object modules/bug"
import { BugReport } from '../object modules/bug-report';

//import the service "PagerService" from the bug "../services/pager.service"
import { PagerService } from '../services/pager.service'

//create new component
@Component({
    //his label in the HTML code
    selector: 'bug-detail',
    //the code that will be read when the component will be called
    templateUrl: './app/pages/bug-detail.component.html',
    styleUrls: ['./app/styles/bug-detail.component.css'],
})

//the class of this new component
export class BugDetailComponent implements OnChanges {
    @Input() bugs: BugReport[];
    @Input() length: number;
    @Input() bugsToDeleteArr: Array<any>;
    indexArr: Array<any> = [];
    //pager vars
    // dummy array of items to be paged
    private bugsArr: Array<any> = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private pagerService: PagerService) {
    }

    ngOnChanges() {
        this.bugsArr = [];
        for (var i = 0; i < this.length; i++) {
            this.bugsArr[i] = this.bugs[i];
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
        this.pager = this.pagerService.getPager(this.bugsArr.length, page);

        // get current page of items
        this.pagedItems = this.bugsArr.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    check(index1: number): void {
        var j = 0, flag = false, bugIndex = 0;
        for (j = 0; j < this.bugsToDeleteArr.length; j++) {
            if (this.bugsToDeleteArr[j] == this.bugsArr[index1]._id) {
                flag = true;
                bugIndex = j;
            }
        }
        if (flag == false)
            this.bugsToDeleteArr.push(this.bugsArr[index1]._id);
        else
            this.bugsToDeleteArr.splice(bugIndex, 1);
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