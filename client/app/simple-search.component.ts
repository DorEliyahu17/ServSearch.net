//import the component declare in order to create a new one
import { Component } from '@angular/core';
import {Router/*, __router_private__*/} from '@angular/router';
import {URLSearchParams, /*QueryEncoder*/} from '@angular/http';


//import the class "File" from the file "./file"
import { File } from './file';

//import the service "FileService" from the file "./file.service"
import { FileService } from './file.service';


@Component({
  selector: 'simplesearch',
  templateUrl: 'app/pages/simple-search.component.html',
  styleUrls: ['app/styles/simple-search.component.css'],
  providers: [FileService]
})

export class SimpleSearchComponent
{
  //file: File;
file=new File();
  constructor(private router: Router, private fileService: FileService) { }

  search():void {
    var name = (<HTMLInputElement>document.getElementById("FileName")).value;
    var type = (<HTMLInputElement>document.getElementById("FileType")).value;
    var server = (<HTMLInputElement>document.getElementById("FileServer")).value;

    // WORK FILE SERVICE
    // GETS THE PARAMAS


    // Parameters obj-
    let params: URLSearchParams = new URLSearchParams();
    params.set('name', name);
    params.set('type', type);
    params.set('server', server);

    this.fileService.getFile(params)
        .then((data) => {
          console.log(data);
          let link = ['/res'];
          this.router.navigate(link);
        });


    // fileService.findFile(serach).then((data) =>{
    // console.log(data);
    //}
    /*
     if((name!="")&&(type!="")&&(server!="")) {
     //everything were inserted
     console.log("name: " + name + " type: " + type + " server: " + server);
     this.goToResaultAll(name, type, server);
     }
     else if((name!="")&&(type!="")) {
     //server not inserted
     console.log("name: " + name + " type: " + type);
     this.goToResaultNoServer(name, type);
     }
     else if((name!="")&&(server!="")) {
     //type not inserted
     console.log("name: " + name + " server: " + server);
     this.goToResaultNoType(name, server);
     }
     else if((type!="")&&(server!="")) {
     //name not inserted
     console.log("type: " + type + " server: " + server);
     this.goToResaultNoName(type, server);
     }
     else if(name!="")
     {
     //type and server not inserted
     console.log("name: "+name);
     this.goToResaultOnlyName(name);
     //this.fileService.getFiles();
     }
     else if(type!=""){
     //name and server and server not inserted
     console.log("type: "+type);
     this.goToResaultOnlyType(type);
     }
     else if(server!=""){
     //name and type and server not inserted
     console.log("server: "+server);
     this.goToResaultOnlyServer(server);
     }
     else {
     //nothing was inserted
     console.log("לא הוכנס ערך");
     alert("לא הוכנס שום ערך, אנא הכנס/י לפחות ערך אחד");
     }*/
  }

  /*
   //go to resault of all variables
   goToResaultAll(name, type, server): void {
   let link = ['/resault', name, type, server];
   this.router.navigate(link);
   }

   //go to resault without name
   goToResaultNoName(type, server): void {
   let link = ['/resault', type, server];
   this.router.navigate(link);
   }

   //go to resault without type
   goToResaultNoType(name, server): void {
   let link = ['/resault', name, server];
   this.router.navigate(link);
   }

   //go to resault without server
   goToResaultNoServer(name, type): void {
   let link = ['/resault', name, type];
   this.router.navigate(link);
   }

   //go to resault only name
   goToResaultOnlyName(name): void {

   let link = ['/resault', name];
   this.router.navigate(link);
   }

   //go to resault only type
   goToResaultOnlyType(type): void {
   let link = ['/resault', type];
   this.router.navigate(link);
   }

   //go to resault only server
   goToResaultOnlyServer(server): void {
   let link = ['/resault', server];
   this.router.navigate(link);
   }*/
}