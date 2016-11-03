//import the component declare in order to create a new one
import { Component, Input/*, OnInit */} from '@angular/core';
import { Router } from '@angular/router';

//import the class "File" from the file "./file"
import { File } from './file';

//import the service "FileService" from the file "./file.service"
import { FileService } from './file.service';


//create new component
@Component({
	//his label in the HTML code
	selector: 'advanceSearch',
	//the code that will be read when the component will be called
	templateUrl: 'app/pages/advance-search.component.html',
	//the style of the code
	styleUrls: ['app/styles/advance-search.component.css'],
	providers: [FileService]
})

//the class of this new component
export class AdvanceSearchComponent/* implements OnInit*/
{
	@Input() filename;
	files =[
		{
			name: "File 1",
			type: "txt",
			size: "15654",
			location: "c:/stam/stam1.1",
			premissions:"xsakmxas",
			createdUser: "Dor",
			modifidedDate: "1.1.16"
		},
		{
			name: "File 2",
			type: "doc",
			size: "1218",
			location: "c:/stam/stam1.2",
			premissions:"xsascdsfdxkmxas",
			createdUser: "dcs",
			modifidedDate: "7.1.16"
		},
		{
			name: "File 3",
			type: "ts",
			size: "2138",
			location: "c:/stam/stam1.3",
			premissions:"xsakcxzzxczxmxas",
			createdUser: "sxz",
			modifidedDate: "1.8.16"
		}
	];

	constructor(private router: Router/*, private fileService: FileService*/) { }
	/*ngOnInit(): void {

	}*/


	search(): void{

	}

	visibleAndHidden(): void{
		var regularSearch = document.getElementById("regular");
		regularSearch.className = "hidden";
		var advanceSearch = document.getElementById("advance");
		advanceSearch.className = "visible";
	}

	click2Check(): void{
		var inputField=document.getElementById("user-input");
		if(inputField.getAttribute("disable")=="disable")
		{
			console.log("inside");
			inputField.removeAttribute("disabled");
		}
		else
		{
			inputField.setAttribute("disable","disable");
		}
	}

/*
	click2Check(name: String): void{
		var inputField=document.getElementById(name);
		if(inputField.getAttribute("disable")=="disable")
		{
			console.log("inside");
			inputField.removeAttribute("disabled");
		}
		else
		{
			inputField.setAttribute("disable","disable");
		}
	}
*/



	/*
	 getFiles(): void {
	 this.FileService.getFiles().then(heroes => this.heroes = heroes);
	 }
	 */

	/*
	 gotoDetail(): void{
	 //open the file
	 }
	 */
}