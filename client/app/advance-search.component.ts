//import the component declare in order to create a new one
import { Component } from '@angular/core';

//import the class "File" from the file "./file"
import { File } from './file';

//import the service "FileService" from the file "./file.service"
import { FileService } from './file.service';

//create new component
@Component({
	//his label in the HTML code
	selector: 'advanceSearch',
	//the code that will be read when the component will be called
	templateUrl: './app/pages/advance-search.component.html',
	//the style of the code
	styleUrls: ['./app/styles/advance-search.component.css'],
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
		var regularSearch = document.getElementById("regular");
		regularSearch.className = "hidden";
		var advanceSearch = document.getElementById("advance");
		advanceSearch.className = "visible";
	}

	simpleSearch():void{
		var regularSearch = document.getElementById("regular");
		regularSearch.className = "visible";
		var advanceSearch = document.getElementById("advance");
		advanceSearch.className = "hidden";
	}
	/*
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
	 */

	//function enable/disable the radio input
	clickCheck(radio1ID, radio2ID, input1ID, input2ID): void{
		var radio1Field=document.getElementById(radio1ID);
		var radio2Field=document.getElementById(radio2ID);
		var input1Field=document.getElementById(input1ID);
		var input2Field=document.getElementById(input2ID);
		if((radio1Field.hasAttribute("disabled"))&&(radio2Field.hasAttribute("disabled"))) {
			radio1Field.removeAttribute("disabled");
			radio2Field.removeAttribute("disabled");

			if(radio1Field.hasAttribute("disabled"))
				input1Field.removeAttribute("disabled");
			if(radio2Field.hasAttribute("disabled"))
				input2Field.removeAttribute("disabled");
		}
		else {
			radio1Field.setAttribute("disabled","disabled");
			radio2Field.setAttribute("disabled","disabled");
			if(!(input1Field.hasAttribute("disabled")))
				input1Field.setAttribute("disabled","disabled");
			if(!(input2Field.hasAttribute("disabled")))
				input2Field.setAttribute("disabled","disabled");
		}
	}

	//function enable/disable the input field
	radioCheck(enableInputID, disableInputID): void{
		var input1Field=document.getElementById(enableInputID);
		var input2Field=document.getElementById(disableInputID);
		if(input1Field.hasAttribute("disabled")) {
			input1Field.removeAttribute("disabled");
			if(!(input2Field.hasAttribute("disabled")))
				input2Field.setAttribute("disabled","disabled");
		}
	}

	/*
	 var EnableField=document.getElementById(EnableID);
	 var disableField=document.getElementById(disableID);
	 var disCheckedField=document.getElementById(disCheckedID);
	 var checkField=document.getElementById(checkID);
	 console.log("EnableField.hasAttribute('disabled')="+EnableField.hasAttribute("disabled")+
	 "!(disableField.hasAttribute('disabled'))="+!(disableField.hasAttribute("disabled"))+
	 "disCheckedField.hasAttribute('checked')="+disCheckedField.hasAttribute("checked"));
	 if(EnableField.hasAttribute("disabled"))
	 {
	 EnableField.removeAttribute("disabled");
	 checkField.setAttribute("checked","checked");
	 if(!(disableField.hasAttribute("disabled")))
	 disableField.setAttribute("disabled","disabled");
	 if(disCheckedField.hasAttribute("checked"))
	 EnableField.removeAttribute("checked")
	 }
	 else
	 {
	 EnableField.setAttribute("disabled","disabled");
	 checkField.removeAttribute("checked");
	 }
	 */






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