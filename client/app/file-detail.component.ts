//import the component declare in order to create a new one
import { Component, /*Input,*/ OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
export class FileDetailComponent implements OnInit{
    /*@Input()*/
    file: File;

    constructor(private fileService: FileService, private route: ActivatedRoute){}

    ngOnInit(): void {
        /*
        this.route.params.forEach((params: Params) => {
            let name = +params[':name'];
            let type = +params[':type'];
            let server = +params[':server'];
            console.log("constructor: name:"+name+", type="+type+" ,server="+server);
            this.fileService.getFile(name, type, server)
                .then(FILE =>
                    this.file = FILE);
        });
        */
    }

    goBack(): void{
        window.history.back();
    }

    /*
    save(): void {
        this.fileService.update(this.hero)
            .then(this.goBack);
    }*/
}