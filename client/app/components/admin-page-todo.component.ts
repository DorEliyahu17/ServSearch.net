//import the component declare in order to create a new one
import { Component, OnInit } from '@angular/core';
import {URLSearchParams} from '@angular/http';

//import the class "File" from the file "../object modules/file"
import { ToDo } from '../object modules/ToDo_item';

//import the service "PagerService" from the file "../services/pager.service"
import { AdminPageService } from '../services/admin-page.service'

// Add the RxJS Observable operators.
import '../rxjs/rxjs-operators';

//create new component
@Component({
	//his label in the HTML code
	selector: 'admin-todo',
	//the code that will be read when the component will be called
	templateUrl: './app/pages/admin-page-todo.component.html',
  	styleUrls: ['./app/styles/admin-page-todo.component.css']
})
export class AdminPageTodoComponent {
	public ToDos: ToDo[];
	public length: number;
	isToDos:boolean =false;
	public alerts: Array<Object>=[];
	indexArr:Array<any>=[];
	ToDosToDeleteArr:Array<any>=[];

	constructor(private adminPageService: AdminPageService){}

	//warning=1
	//danger=2
	//success=3
	ngOnInit():void{
		this.alerts = [];
		this.adminPageService.getToDos().then((data: any) => {
			if (data.name == "MongoError")
				this.alerts.push({
					msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
					type: 2
				});
			else {
				if (data.length > 0) {
					this.ToDos = data;
					this.length = this.ToDos.length;
					this.isToDos=true;
				}
				else
					this.alerts.push({
						msg: 'לא נשארו משימות לביצוע מדווחות במערכת.',
						type: 3
					});
			}
		});
	}

	deleteToDos() {
		if(this.ToDos.length!=0) {
			if (this.ToDosToDeleteArr.length == 0) {
				this.alerts = [];
				this.alerts.push({
					msg: 'לא סומנו אף באגים למחיקה!',
					type: 2
				});
			}
			else {
				this.alerts = [];
				this.isToDos = false;
				//Parameters obj
				let params: URLSearchParams = new URLSearchParams();
				//params.set('ToDos', this.ToDos);
				for (var i = 0; i <= this.ToDosToDeleteArr.length; i++) {
					//in case of only one bug its create an arr
					if (i == this.ToDosToDeleteArr.length)
						params.append('_id', '0');
					else
						params.append('_id', this.ToDosToDeleteArr[i]);
				}
				this.adminPageService.deleteToDos(params).then((data: any) => {
					if (data.name == "MongoError")
						this.alerts.push({
							msg: 'אופס... ישנה בעיה עם ה-DataBase, אנא בדוק אותו ולאחר התיקון תרפרש את הדף.',
							type: 2
						});
					else {
						this.ToDos = data;
						if (data.length > 0) {
							this.ToDos = data;
							this.length = this.ToDos.length;
							this.isToDos = true;
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