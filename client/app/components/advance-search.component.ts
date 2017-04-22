//import the component declare in order to create a new one
import {Component, Input} from '@angular/core';
import { URLSearchParams } from "@angular/http";

//import the class "File" from the file "./file"
import { File } from '../object modules/file';

//import the service "FileService" from the file "./file.service"
import { FileService } from '../services/file.service';


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
export class AdvanceSearchComponent {
	//@Input() serverNames: Array<any> = [];
	@Input() files: File[];
	@Input() length;
	@Input() isResult: boolean;
	@Input() loadingFlag: boolean;
	@Input() public alerts: Array<Object>;
	@Input() public errorFlag: boolean;
	file = new File();

	constructor(private fileService: FileService) {
	}

	search(): void {
		this.isResult = false;
		this.loadingFlag = true;
		this.files = [];
		var temp;
		//var resultSearch = document.getElementById("result");
		//resultSearch.className = "hidden";
		var name = (<HTMLInputElement>document.getElementById("FileName")).value;
		var type = (<HTMLInputElement>document.getElementById("FileType")).value;
		var server = (<HTMLInputElement>document.getElementById("FileServer")).value;

		var dateCheck = (<HTMLInputElement>document.getElementById("date-check")).checked;
		var dateRadio1 = (<HTMLInputElement>document.getElementById("date-radio1")).checked;
		var dateRadio2 = (<HTMLInputElement>document.getElementById("date-radio2")).checked;

		var dateField = (<HTMLInputElement>document.getElementById("date-text")).value;
		var dateFieldLow = (<HTMLInputElement>document.getElementById("date-textLow")).value;
		var dateFieldHigh = (<HTMLInputElement>document.getElementById("date-textHigh")).value;

		var sizeCheck = (<HTMLInputElement>document.getElementById("size-check")).checked;
		var sizeRadio1 = (<HTMLInputElement>document.getElementById("size-radio1")).checked;
		var sizeRadio2 = (<HTMLInputElement>document.getElementById("size-radio2")).checked;

		var sizeField = (<HTMLInputElement>document.getElementById("size-text")).value;
		var sizeFieldLow = (<HTMLInputElement>document.getElementById("size-textLow")).value;
		var sizeFieldHigh = (<HTMLInputElement>document.getElementById("size-textHigh")).value;

		if (dateCheck) {
			if (dateRadio1) {
				dateFieldLow = "";
				dateFieldHigh = "";
				temp=dateField.split("/");
				dateField=temp[2]+temp[1]+temp[0];
			}
			if (dateRadio2){
				dateField = "";
				temp=dateFieldLow.split("/");
				dateFieldLow=temp[2]+temp[1]+temp[0];
				temp=dateFieldHigh.split("/");
				dateFieldHigh=temp[2]+temp[1]+temp[0];
			}

		}
		else {
			dateFieldLow = "";
			dateFieldHigh = "";
			dateField = "";
		}
		if (sizeCheck) {
			if (sizeRadio1) {
				sizeFieldLow = "";
				sizeFieldHigh = "";
			}
			if (sizeRadio2){
				sizeField = "";
			}
		}
		else {
			sizeFieldLow = "";
			sizeFieldHigh = "";
			sizeField = "";
		}

		// WORK FILE SERVICE
		// GETS THE PARAMAS

		//Parameters obj
		let params: URLSearchParams = new URLSearchParams();
		params.set('name', name);
		params.set('type', type);
		params.set('server', server.toUpperCase());
		params.set('size', sizeField);
		params.set('date', dateField);
		params.set('sizeRangeLow', sizeFieldLow);
		params.set('sizeRangeHigh', sizeFieldHigh);
		params.set('dateRangeLow', dateFieldLow);
		params.set('dateRangeHigh', dateFieldHigh);

		//get the files arr from the service
		this.fileService.getFiles(params)
            .then((data: any/*File[]*/) => {
				if (data.name == "MongoError")
					this.errorFlag = true;
				else {
					if (data.length > 0) {
						this.files = data;
						this.length = this.files.length;
						if (this.alerts.length > 0)
							this.alerts.splice(0, this.alerts.length);
						this.isResult = true;
						this.loadingFlag = false;
						//visible and hidden change
						//var resultSearch = document.getElementById("result");
						//resultSearch.className = "visible";
						//this.isResult = true;
					}
					else {
						//warning=1
						//danger=2
						//success=3
						if (this.alerts.length > 0)
							this.alerts.splice(0, this.alerts.length);
						if ((name != "") || (type != "") || (server != "")) {
							if (server == "")
								this.alerts.push({msg: 'אנא בחר את השרת שבו תרצה לחפש.', type: 2});
							else
								this.alerts.push({
									msg: 'לא נמצאה אף תוצאה, נסה לחפש שוב או לחפש בעזרת חיפוש מתקדם.',
									type: 1
								});
						}
						else
							this.alerts.push({msg: 'לא הוכנס שום ערך.', type: 2});
						this.loadingFlag = false;
					}
				}
			});

	}

	advanceSearch(): void {
		var regularSearch = document.getElementById("regular");
		var regularSearchBTN = document.getElementById("simpleSearchBTN");
		regularSearch.className = "hidden";
		regularSearchBTN.className = "hidden";
		var advanceSearch = document.getElementById("advance");
		advanceSearch.className = "visible";
	}

	simpleSearch(): void {
		var regularSearch = document.getElementById("regular");
		var regularSearchBTN = document.getElementById("simpleSearchBTN");
		regularSearch.className = "visible";
		regularSearchBTN.className = "visible";
		var advanceSearch = document.getElementById("advance");
		advanceSearch.className = "hidden";
	}

	//function enable/disable the radio input
	clickCheck(radio1ID, radio2ID, input1ID, input2ID, input3ID): void {
		var radio1Field = <HTMLInputElement>document.getElementById(radio1ID);
		var radio2Field = <HTMLInputElement>document.getElementById(radio2ID);
		var input1Field = <HTMLInputElement>document.getElementById(input1ID);
		var input2Field = <HTMLInputElement>document.getElementById(input2ID);
		var input3Field = <HTMLInputElement>document.getElementById(input3ID);

		if ((radio1Field.hasAttribute("disabled")) && (radio2Field.hasAttribute("disabled"))) {
			//enable the radio fields
			radio1Field.removeAttribute("disabled");
			radio2Field.removeAttribute("disabled");

			//enable the input field
			if (radio1Field.checked)
				input1Field.removeAttribute("disabled");
			if (radio2Field.checked) {
				input2Field.removeAttribute("disabled");
				input3Field.removeAttribute("disabled");
			}
		}
		else {
			//disable the radio fields
			radio1Field.setAttribute("disabled", "disabled");
			radio2Field.setAttribute("disabled", "disabled");

			//disable the input field
			if (!(input1Field.checked))
				input1Field.setAttribute("disabled", "disabled");
			if (!(input2Field.checked)) {
				input2Field.setAttribute("disabled", "disabled");
				input3Field.setAttribute("disabled", "disabled");
			}
		}
	}

	//function enable/disable the input field
	radioCheck(click, regularInputID, advanceInputID, rangeInputID): void {
		var regularField = document.getElementById(regularInputID);
		var advanceField = document.getElementById(advanceInputID);
		var rangeInputField = document.getElementById(rangeInputID);

		if (click==1) {
			regularField.removeAttribute("disabled");
			advanceField.setAttribute("disabled", "disabled");
			rangeInputField.setAttribute("disabled", "disabled");
		} else {
			regularField.setAttribute("disabled", "disabled");
			advanceField.removeAttribute("disabled");
			rangeInputField.removeAttribute("disabled");
		}
	}
}