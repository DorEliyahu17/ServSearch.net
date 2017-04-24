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
		this.length = 0;
		var temp;
		if (this.alerts.length > 0)
			this.alerts.splice(0, this.alerts.length);
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
		var sizeTypeField = (<HTMLInputElement>document.getElementById("size-type")).value;
		var sizeFieldLow = (<HTMLInputElement>document.getElementById("size-textLow")).value;
		var sizeTypeFieldLow = (<HTMLInputElement>document.getElementById("size-typeLow")).value;
		var sizeFieldHigh = (<HTMLInputElement>document.getElementById("size-textHigh")).value;
		var sizeTypeFieldHigh = (<HTMLInputElement>document.getElementById("size-typeHigh")).value;

		if (server == "") {
			this.loadingFlag = false;
			if ((name == "") && (type == ""))
				this.alerts.push({msg: 'אנא מלא את אחד מהמסננים ואת השרת שבו תרצה לחפש.', type: 2});
			else
				this.alerts.push({msg: 'אנא בחר את השרת שבו תרצה לחפש.', type: 2});
		}
		else {
			if ((name == "") && (type == "")) {
				this.loadingFlag = false;
				this.alerts.push({msg: 'אנא מלא את אחד מהמסננים ואת השרת שבו תרצה לחפש.', type: 2});
			}
			else {
				if (dateCheck) {
					if (dateRadio1) {
						dateFieldLow = "";
						dateFieldHigh = "";
						temp = dateField.split("/");
						dateField = temp[2] + temp[1] + temp[0];
					}
					if (dateRadio2) {
						dateField = "";
						temp = dateFieldLow.split("/");
						dateFieldLow = temp[2] + temp[1] + temp[0];
						temp = dateFieldHigh.split("/");
						dateFieldHigh = temp[2] + temp[1] + temp[0];
					}

				}
				else {
					dateFieldLow = "";
					dateFieldHigh = "";
					dateField = "";
				}
				if (sizeCheck) {
					if ((sizeRadio1) && (sizeTypeField != "")) {
						sizeFieldLow = "";
						sizeFieldHigh = "";
						switch (sizeTypeField) {
							case "Byte":
								break;
							case "KB":
								sizeField = "" + parseInt(sizeField) * 1024;
								break;
							case "MB":
								sizeField = "" + parseInt(sizeField) * 1024 * 1024;
								break;
							case "GB":
								sizeField = "" + parseInt(sizeField) * 1024 * 1024 * 1024;
								break;
							case "TB":
								sizeField = "" + parseInt(sizeField) * 1024 * 1024 * 1024 * 1024;
								break;
							case "PB":
								sizeField = "" + parseInt(sizeField) * 1024 * 1024 * 1024 * 1024 * 1024;
								break;
						}
					}
					if ((sizeRadio2) && (sizeTypeFieldLow != "") && (sizeTypeFieldHigh != "")) {
						sizeField = "";
						switch (sizeTypeFieldLow) {
							case "Byte":
								break;
							case "KB":
								sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024;
								break;
							case "MB":
								sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024 * 1024;
								break;
							case "GB":
								sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024 * 1024 * 1024;
								break;
							case "TB":
								sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024 * 1024 * 1024 * 1024;
								break;
							case "PB":
								sizeFieldLow = "" + parseInt(sizeFieldLow) * 1024 * 1024 * 1024 * 1024 * 1024;
								break;
						}
						switch (sizeTypeFieldHigh) {
							case "Byte":
								break;
							case "KB":
								sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024;
								break;
							case "MB":
								sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024 * 1024;
								break;
							case "GB":
								sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024 * 1024 * 1024;
								break;
							case "TB":
								sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024 * 1024 * 1024 * 1024;
								break;
							case "PB":
								sizeFieldHigh = "" + parseInt(sizeFieldHigh) * 1024 * 1024 * 1024 * 1024 * 1024;
								break;
						}
					}
					if (!(((sizeRadio1) && (sizeTypeField != "")) || ((sizeRadio2) && (sizeTypeFieldLow != "") && (sizeTypeFieldHigh != "")))) {
						this.loadingFlag = false;
						this.alerts.push({msg: 'אנא בחר את סוג הגודל שבעזרתו תרצה לחפש.', type: 2});
					}
				}
				else {
					sizeFieldLow = "";
					sizeFieldHigh = "";
					sizeField = "";
				}
				console.log("sizeField=" + sizeField + " sizeFieldLow=" + sizeFieldLow + " sizeFieldHigh=" + sizeFieldHigh);
				if(this.loadingFlag) {
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
								}
								else {
									//warning=1
									//danger=2
									//success=3
									this.loadingFlag = false;
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
								}
							}
						});
				}
			}
		}

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
	dateClickCheck(radio1ID, radio2ID, regularInputID, lowInputID, highInputID): void {
		var radio1Field = <HTMLInputElement>document.getElementById(radio1ID);
		var radio2Field = <HTMLInputElement>document.getElementById(radio2ID);
		var regularField = <HTMLInputElement>document.getElementById(regularInputID);
		var lowInputField = <HTMLInputElement>document.getElementById(lowInputID);
		var highInputField = <HTMLInputElement>document.getElementById(highInputID);

		if ((radio1Field.hasAttribute("disabled")) && (radio2Field.hasAttribute("disabled"))) {
			//enable the radio fields
			radio1Field.removeAttribute("disabled");
			radio2Field.removeAttribute("disabled");

			//enable the input field
			if (radio1Field.checked)
				regularField.removeAttribute("disabled");
			if (radio2Field.checked) {
				lowInputField.removeAttribute("disabled");
				highInputField.removeAttribute("disabled");
			}
		}
		else {
			//disable the radio fields
			radio1Field.setAttribute("disabled", "disabled");
			radio2Field.setAttribute("disabled", "disabled");

			//disable the input field
			if (!(regularField.checked))
				regularField.setAttribute("disabled", "disabled");
			if (!(lowInputField.checked)) {
				lowInputField.setAttribute("disabled", "disabled");
				highInputField.setAttribute("disabled", "disabled");
			}
		}
	}

//function enable/disable the radio input
	/*sizeClickCheck(radio1ID, radio2ID, input1ID, lowInputID, input3ID)*/
	sizeClickCheck(radio1ID, radio2ID, regularInputID, regularInputTypeID, lowInputID, lowInputTypeID, highInputID, highInputTypeID): void {
		var radio1Field = <HTMLInputElement>document.getElementById(radio1ID);
		var radio2Field = <HTMLInputElement>document.getElementById(radio2ID);
		var regularField = <HTMLInputElement>document.getElementById(regularInputID);
		var regularTypeField = document.getElementById(regularInputTypeID);
		var lowInputField = <HTMLInputElement>document.getElementById(lowInputID);
		var lowInputTypeField = document.getElementById(lowInputTypeID);
		var highInputField = <HTMLInputElement>document.getElementById(highInputID);
		var highInputTypeField = document.getElementById(highInputTypeID);

		if ((radio1Field.hasAttribute("disabled")) && (radio2Field.hasAttribute("disabled"))) {
			//enable the radio fields
			radio1Field.removeAttribute("disabled");
			radio2Field.removeAttribute("disabled");

			//enable the input field
			if (radio1Field.checked) {
				regularField.removeAttribute("disabled");
				regularTypeField.removeAttribute("disabled");
			}
			if (radio2Field.checked) {
				lowInputField.removeAttribute("disabled");
				highInputField.removeAttribute("disabled");
				lowInputTypeField.removeAttribute("disabled");
				highInputTypeField.removeAttribute("disabled");
			}
		}
		else {
			//disable the radio fields
			radio1Field.setAttribute("disabled", "disabled");
			radio2Field.setAttribute("disabled", "disabled");

			//disable the input field
			if (!(regularField.checked)) {
				regularField.setAttribute("disabled", "disabled");
				regularTypeField.setAttribute("disabled", "disabled");
			}
			if (!(lowInputField.checked)) {
				lowInputField.setAttribute("disabled", "disabled");
				highInputField.setAttribute("disabled", "disabled");
				lowInputTypeField.setAttribute("disabled", "disabled");
				highInputTypeField.setAttribute("disabled", "disabled");
			}
		}
	}

//function enable/disable the input field
	dateRadioCheck(click, regularInputID, lowInputID, highInputID): void {
		var regularField = document.getElementById(regularInputID);
		var lowInputField = document.getElementById(lowInputID);
		var highInputField = document.getElementById(highInputID);

		if (click == 1) {
			regularField.removeAttribute("disabled");
			lowInputField.setAttribute("disabled", "disabled");
			highInputField.setAttribute("disabled", "disabled");
		} else {
			regularField.setAttribute("disabled", "disabled");
			lowInputField.removeAttribute("disabled");
			highInputField.removeAttribute("disabled");
		}
	}

//function enable/disable the input field
	sizeRadioCheck(click, regularInputID, regularInputTypeID, lowInputID, lowInputTypeID, highInputID, highInputTypeID): void {
		var regularField = document.getElementById(regularInputID);
		var regularTypeField = document.getElementById(regularInputTypeID);
		var lowInputField = document.getElementById(lowInputID);
		var lowInputTypeField = document.getElementById(lowInputTypeID);
		var highInputField = document.getElementById(highInputID);
		var highInputTypeField = document.getElementById(highInputTypeID);
		if (click == 1) {
			regularField.removeAttribute("disabled");
			regularTypeField.removeAttribute("disabled");
			lowInputField.setAttribute("disabled", "disabled");
			highInputField.setAttribute("disabled", "disabled");
			lowInputTypeField.setAttribute("disabled", "disabled");
			highInputTypeField.setAttribute("disabled", "disabled");
		} else {
			regularField.setAttribute("disabled", "disabled");
			regularTypeField.setAttribute("disabled", "disabled");
			lowInputField.removeAttribute("disabled");
			highInputField.removeAttribute("disabled");
			lowInputTypeField.removeAttribute("disabled");
			highInputTypeField.removeAttribute("disabled");
		}
	}
}