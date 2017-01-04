//import the component declare in order to create a new one
import { Component } from '@angular/core';

//import the class "File" from the file "./file"
import { File } from '../file';

//import the service "FileService" from the file "./file.service"
import { FileService } from '../services/file.service';

//create new component
@Component({
	//his label in the HTML code
	selector: 'advanceSearch',
	//the code that will be read when the component will be called
	templateUrl: '../pages/advance-search.component.html',
	//the style of the code
	styleUrls: ['../styles/advance-search.component.css'],
	providers: [FileService]
})

//the class of this new component
export class AdvanceSearchComponent
{
	constructor( private fileService: FileService) { }

	search(): void{
		console.log("advance search - function search activated");
	}

	advanceSearch(): void{
		this.fileService.simpleToAdvance();
	}

	simpleSearch():void{
		this.fileService.advanceToSimple()
	}

	//visible the regular search
	advanceToRegular(): void{
		//visible and hidden change
		var regularSearch = document.getElementById("regular");
		regularSearch.className = "visible";
		var advanceSearch = document.getElementById("advance");
		advanceSearch.className = "hidden";
	}

	//visible the advance search
	regularToAdvance(): void{
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
			inputField.setAttribute("disabled","enabled");
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
}