//import the component declare in order to create a new one
import { Component, Input } from '@angular/core';

//import the class "bug" from the bug "../object modules/bug"
import { ScanDetail } from '../object modules/scanDetail';

// Add the RxJS Observable operators.
import '../rxjs/rxjs-operators';

//create new component
@Component({
	//his label in the HTML code
	selector: 'compare-detail1',
	//the code that will be read when the component will be called
	templateUrl: './app/pages/compare-detail1.component.html'
})
export class CompareDetailComponent1 {
	@Input() scanResults: ScanDetail[];
	public resultChecked: ScanDetail;
	public isComplete=false;

	search() {
		var name = (<HTMLInputElement>document.getElementById("SearchName1")).value;
		this.resultChecked=this.scanResults[name];
		this.isComplete=true;
	}
}