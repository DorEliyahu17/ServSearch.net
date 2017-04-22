//import the component declare in order to create a new one
import { Component, OnInit } from '@angular/core';

// Add the RxJS Observable operators.
import '../rxjs/rxjs-operators';

import { CompareService } from '../services/compare.service';
import { ScanDetail } from '../object modules/scanDetail';

//create new component
@Component({
	//his label in the HTML code
	selector: 'admin-status',
	//the code that will be read when the component will be called
	templateUrl: './app/pages/admin-page-compare.component.html',
	styleUrls: ['./app/styles/admin-page-compare.component.css']
})
export class AdminPageCompareComponent implements OnInit {
	public scanResults: ScanDetail[];
	public alerts: Array<Object>=[];

	constructor(private compareService: CompareService){}

	//warning=1
	//danger=2
	//success=3
	ngOnInit():void{
		this.alerts = [];
		this.compareService.getSortedScanResult().then((data: any) => {
			if (data.name == "MongoError")
				this.alerts.push({
					msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
					type: 2
				});
			else {
				if (data.length > 0) {
					this.scanResults = data;
				}
				else
					this.alerts.push({
						msg: 'לא דווחו למערכת אף דוחות סריקה.',
						type: 3
					});
			}
		});
	}
}