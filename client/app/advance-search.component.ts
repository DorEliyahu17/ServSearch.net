//import the component declare in order to create a new one
import {Component, Input} from '@angular/core';

//import the class "File" from the file "./file"
import { File } from './file';

//import the service "FileService" from the file "./file.service"
import { FileService } from './file.service';
import {URLSearchParams} from "@angular/http";

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
export class AdvanceSearchComponent{
	@Input() serverNames: Array<any>=[];
	@Input() files:File[];
	@Input() length;
	@Input() isResult:boolean =false;
	public alerts: Array<Object>=[];
	file=new File();


	constructor( private fileService: FileService) { }

	search(): void{
		var i;
		var resultSearch = document.getElementById("result");
		resultSearch.className = "hidden";
		var name = (<HTMLInputElement>document.getElementById("FileName")).value;
		var type = (<HTMLInputElement>document.getElementById("FileType")).value;
		var server = (<HTMLInputElement>document.getElementById("FileServer")).value;

        var dateCheck=(<HTMLInputElement>document.getElementById("date-check")).checked;
        var dateRadio1=(<HTMLInputElement>document.getElementById("date-radio1")).checked;
        var dateRadio2=(<HTMLInputElement>document.getElementById("date-radio2")).checked;
        var date1Field=(<HTMLInputElement>document.getElementById("date-text1")).value;
        var date2Field=(<HTMLInputElement>document.getElementById("date-text2")).value;

        var sizeCheck=(<HTMLInputElement>document.getElementById("size-check")).checked;
        var sizeRadio1=(<HTMLInputElement>document.getElementById("size-radio1")).checked;
        var sizeRadio2=(<HTMLInputElement>document.getElementById("size-radio2")).checked;
        var size1Field=(<HTMLInputElement>document.getElementById("size-text1")).value;
        var size2Field=(<HTMLInputElement>document.getElementById("size-text2")).value;

        if(dateCheck)
        {
            if(dateRadio1)
                date2Field="";
            if(dateRadio2)
                date1Field="";
        }
        if(sizeCheck)
        {
            if(sizeRadio1)
                size2Field="";
            if(sizeRadio2)
                size1Field="";
        }

		// WORK FILE SERVICE
		// GETS THE PARAMAS

		//Parameters obj
		let params: URLSearchParams = new URLSearchParams();
		params.set('name', name);
		params.set('type', type);
		params.set('server', server.toUpperCase());

		//get the files arr from the service
		this.fileService.getFiles(params)
            .then((data:File[]) => {
				if(data.length>0)
				{
					this.files=data;
					length=this.files.length;
					if(this.alerts.length>0)
						this.alerts.splice(0, this.alerts.length);
					this.isResult=true;
					//visible and hidden change
					var resultSearch = document.getElementById("result");
					resultSearch.className = "visible";
				}
				else
				{
					//warning=1
					//danger=2
					//success=3
					if(this.alerts.length>0)
						this.alerts.splice(0, this.alerts.length);
					if((name != "") || (type != "") || (server != "")) {
						if (server == "")
							this.alerts.push({msg: 'אנא בחר את השרת שבו תרצה לחפש.', type: 2});
						else
							this.alerts.push({msg: 'לא נמצאה אף תוצאה, נסה לחפש שוב או לחפש בעזרת חיפוש מתקדם.', type: 1});
					}
					else
						this.alerts.push({msg: 'לא הוכנס שום ערך.', type: 2});
				}
			});

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

	//function enable/disable the radio input
	clickCheck(radio1ID, radio2ID, input1ID, input2ID): void{
        var radio1Field=<HTMLInputElement>document.getElementById(radio1ID);
		var radio2Field=<HTMLInputElement>document.getElementById(radio2ID);
		var input1Field=<HTMLInputElement>document.getElementById(input1ID);
		var input2Field=<HTMLInputElement>document.getElementById(input2ID);

		if((radio1Field.hasAttribute("disabled"))&&(radio2Field.hasAttribute("disabled"))) {
            //enable the radio fields
			radio1Field.removeAttribute("disabled");
			radio2Field.removeAttribute("disabled");

			//enable the input field
			if(radio1Field.checked)
				input1Field.removeAttribute("disabled");
			if(radio2Field.checked)
				input2Field.removeAttribute("disabled");
		}
		else {
            //disable the radio fields
			radio1Field.setAttribute("disabled","disabled");
			radio2Field.setAttribute("disabled","disabled");

			//disable the input field
			if(!(input1Field.checked))
				input1Field.setAttribute("disabled","disabled");
			if(!(input2Field.checked))
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
}