//import the component declare in order to create a new one
import { Component, OnInit } from '@angular/core';
import {URLSearchParams} from '@angular/http';

//import the class "File" from the file "../object modules/file"
import { BugReport } from '../object modules/bug-report';

//import the service "PagerService" from the file "../services/pager.service"
import { AdminPageService } from '../services/admin-page.service'

// Add the RxJS Observable operators.
import '../rxjs/rxjs-operators';

//create new component
@Component({
	//his label in the HTML code
	selector: 'admin-bugs',
	//the code that will be read when the component will be called
	templateUrl: './app/pages/admin-page-bugs.component.html',
	styleUrls: ['./app/styles/admin-page-bugs.component.css']
})
export class AdminPageBugsComponent implements OnInit {
	public bugs: BugReport[];
	public length: number;
	isbugs:boolean =false;
	public alerts: Array<Object>=[];
	indexArr:Array<any>=[];
	bugsToDeleteArr:Array<any>=[];

	constructor(private adminPageService: AdminPageService){}

	//warning=1
	//danger=2
	//success=3
	ngOnInit():void{
		this.alerts = [];
		this.adminPageService.getBugs().then((data: any) => {
			if (data.name == "MongoError")
				this.alerts.push({
					msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
					type: 2
				});
			else {
				if (data.length > 0) {
					this.bugs = data;
					this.length = this.bugs.length;
					this.isbugs=true;
				}
				else
					this.alerts.push({
						msg: 'לא דווחו באגים למערכת.',
						type: 3
					});
			}
		});
	}

	deleteBugs() {
		if(this.bugs.length!=0) {
			if (this.bugsToDeleteArr.length == 0) {
				this.alerts = [];
				this.alerts.push({
					msg: 'לא סומנו אף באגים למחיקה!',
					type: 2
				});
			}
			else {
				this.alerts = [];
				this.isbugs = false;
				//Parameters obj
				let params: URLSearchParams = new URLSearchParams();
				//params.set('bugs', this.bugs);
				for (var i = 0; i <= this.bugsToDeleteArr.length; i++) {
					//in case of only one bug its create an arr
					if (i == this.bugsToDeleteArr.length)
						params.append('_id', '0');
					else
						params.append('_id', this.bugsToDeleteArr[i]);
				}
				this.adminPageService.deleteBugs(params).then((data: any) => {
					if (data.name == "MongoError")
						this.alerts.push({
							msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
							type: 2
						});
					else {
						this.bugs = data;
						if (data.length > 0) {
							this.bugs = data;
							this.length = this.bugs.length;
							this.isbugs = true;
						}
						else
							this.alerts.push({
								msg: 'לא דווחו באגים למערכת.',
								type: 3
							});
					}
				});
			}
		}
		else{
			this.alerts = [];
			this.alerts.push({
				msg: 'לא דווחו באגים למערכת.',
				type: 3
			});
		}
	}
}