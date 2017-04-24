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
    //pager vars
    // dummy array of items to be paged
    private filesArr:Array<any>=[];
    imgFlag=false;
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private pagerService: PagerService){}

    ngOnChanges() {
        var date;
        this.filesArr=[];
        for(var i=0;i<this.length;i++) {
            this.imgFlag = false;
            this.filesArr[i] = this.files[i];
            //directory image
            if (this.filesArr[i].type.search("Directory") == 0) {
                this.filesArr[i].img = "folder";
                this.imgFlag = true;
            }
            //jpg image
            if ((this.filesArr[i].type.search("jpg") == 0) || (this.filesArr[i].type.search("jpeg") == 0)) {
                this.filesArr[i].img = "jpeg";
                this.imgFlag = true;
            }
            //gif image
            if (this.filesArr[i].type.search("gif") == 0) {
                this.filesArr[i].img = "gif";
                this.imgFlag = true;
            }
            //bmp image
            if (this.filesArr[i].type.search("bmp") == 0) {
                this.filesArr[i].img = "bmp";
                this.imgFlag = true;
            }
            //png image
            if (this.filesArr[i].type.search("png") == 0) {
                this.filesArr[i].img = "png";
                this.imgFlag = true;
            }
            //access image
            if ((this.filesArr[i].type.search("accd") == 0) || (this.filesArr[i].type.search("mdb") == 0)) {
                this.filesArr[i].img = "word";
                this.imgFlag = true;
            }
            //word image
            if ((this.filesArr[i].type.search("doc") == 0) || (this.filesArr[i].type.search("dot") == 0)) {
                this.filesArr[i].img = "word";
                this.imgFlag = true;
            }
            //excel image
            if ((this.filesArr[i].type.search("xls") == 0) || (this.filesArr[i].type.search("xlt") == 0)) {
                this.filesArr[i].img = "excel";
                this.imgFlag = true;
            }
            //powerpoint image
            if ((this.filesArr[i].type.search("ppt") == 0) || (this.filesArr[i].type.search("pot") == 0)) {
                this.filesArr[i].img = "powerpoint";
                this.imgFlag = true;
            }
            //visio image
            if (this.filesArr[i].type.search("vsd") == 0) {
                this.filesArr[i].img = "visio";
                this.imgFlag = true;
            }
            //publisher image
            if (this.filesArr[i].type.search("pub") == 0) {
                this.filesArr[i].img = "publisher";
                this.imgFlag = true;
            }
            //bat image
            if (this.filesArr[i].type.search("bat") == 0) {
                this.filesArr[i].img = "bat";
                this.imgFlag = true;
            }
            //bat image
            if ((this.filesArr[i].type.search("ini") == 0) || (this.filesArr[i].type.search("set") == 0)) {
                this.filesArr[i].img = "settings";
                this.imgFlag = true;
            }
            //exe image
            if (this.filesArr[i].type.search("exe") == 0) {
                this.filesArr[i].img = "exe";
                this.imgFlag = true;
            }
            //txt image
            if (this.filesArr[i].type.search("txt") == 0) {
                this.filesArr[i].img = "document";
                this.imgFlag = true;
            }
            //pdf image
            if (this.filesArr[i].type.search("pdf") == 0) {
                this.filesArr[i].img = "pdf";
                this.imgFlag = true;
            }
            //photoshop image
            if (this.filesArr[i].type.search("psd") == 0) {
                this.filesArr[i].img = "photoshop";
                this.imgFlag = true;
            }
            //css image
            if (this.filesArr[i].type.search("css") == 0) {
                this.filesArr[i].img = "css";
                this.imgFlag = true;
            }
            //html image
            if (this.filesArr[i].type.search("html") == 0) {
                this.filesArr[i].img = "html";
                this.imgFlag = true;
            }
            //typescript image
            if (this.filesArr[i].type.search("ts") == 0) {
                this.filesArr[i].img = "typescript";
                this.imgFlag = true;
            }
            //javascript image
            if (this.filesArr[i].type.search("js") == 0) {
                this.filesArr[i].img = "javascript";
                this.imgFlag = true;
            }
            //windows media audio image
            if (this.filesArr[i].type.search("wma") == 0) {
                this.filesArr[i].img = "wma";
                this.imgFlag = true;
            }
            //windows media video image
            if (this.filesArr[i].type.search("wmv") == 0) {
                this.filesArr[i].img = "wmv";
                this.imgFlag = true;
            }
            //mp3 image
            if (this.filesArr[i].type.search("mp3") == 0) {
                this.filesArr[i].img = "mpthree";
                this.imgFlag = true;
            }
            //zip image
            if (this.filesArr[i].type.search("zip") == 0) {
                this.filesArr[i].img = "zip";
                this.imgFlag = true;
            }
            //rar image
            if (this.filesArr[i].type.search("rar") == 0) {
                this.filesArr[i].img = "rar";
                this.imgFlag = true;
            }
            //else
            if (this.imgFlag == false)
                this.filesArr[i].img = "file";

            //size changer
            if (this.filesArr[i].size < 1024)
                this.filesArr[i].showSize = this.filesArr[i].size + " bytes";
            else {
                if (this.filesArr[i].size < 1048576)
                    this.filesArr[i].showSize = (this.filesArr[i].size / 1024).toFixed(3) + " KB";
                else {
                    if (this.filesArr[i].size < 1073741824)
                        this.filesArr[i].showSize = (this.filesArr[i].size / 1048576).toFixed(3) + " MB";
                    else
                        this.filesArr[i].showSize = (this.filesArr[i].size / 1073741824).toFixed(3) + " GB";
                }
            }

            //date changer
            this.filesArr[i].modifiedDate =this.filesArr[i].modifiedDate+"";
            this.filesArr[i].modifiedDate = this.filesArr[i].modifiedDate[6] + this.filesArr[i].modifiedDate[7] + "/" +
                this.filesArr[i].modifiedDate[4] + this.filesArr[i].modifiedDate[5] + "/" +
                this.filesArr[i].modifiedDate[0] + this.filesArr[i].modifiedDate[1] + this.filesArr[i].modifiedDate[2] + this.filesArr[i].modifiedDate[3];
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
        window.scrollTo(0, 0);
    }
    /*
     goBack(): void{
     //visible and hidden change
     var regularSearch = document.getElementById("regular");
     regularSearch.className = "hidden";
     var advanceSearch = document.getElementById("advance");
     advanceSearch.className = "visible";
     }*/
}