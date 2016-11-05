"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import the component declare in order to create a new one
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
//import the service "HeroService" from the file "./hero.service"
var file_service_1 = require('./file.service');
//create new component
var FileDetailComponent = (function () {
    //file: File;
    function FileDetailComponent(fileService, route) {
        this.fileService = fileService;
        this.route = route;
    }
    /*
     ngOnInit(): void {
     this.route.params.forEach((params: Params) => {
     let name = +params[':name'];
     let type = +params[':type'];
     let server = +params[':server'];
     console.log("constructor: name:"+name+", type="+type+" ,server="+server);
     this.fileService.getFile(name, type, server)
     .then(FILE =>
     this.file = FILE);
     });
     }*/
    FileDetailComponent.prototype.ngOnChanges = function () {
        //console.log(this.files);
        //@Input() this.files;
        /*let log: string[] = [];
        for (let propName in changes) {
            let changedProp = changes[propName];
            let from = JSON.stringify(changedProp.previousValue);
            let to = JSON.stringify(changedProp.currentValue);
            log.push(`${propName} changed from ${from} to ${to}`);
        }*/
    };
    FileDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FileDetailComponent.prototype, "files", void 0);
    FileDetailComponent = __decorate([
        core_1.Component({
            //his label in the HTML code
            selector: 'my-file-detail',
            //the code that will be read when the component will be called
            templateUrl: 'app/pages/file-detail.component.html',
            styleUrls: ['app/styles/file-detail.component.css'],
        }), 
        __metadata('design:paramtypes', [file_service_1.FileService, router_1.ActivatedRoute])
    ], FileDetailComponent);
    return FileDetailComponent;
}());
exports.FileDetailComponent = FileDetailComponent;
//# sourceMappingURL=file-detail.component.js.map