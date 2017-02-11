//import the component declare in order to create a new one
import { Component } from '@angular/core';
import { URLSearchParams } from "@angular/http";
//import { Router } from '@angular/router';

//import the class "File" from the file "./file"
import { User } from '../object modules/user';

//import the service "FileService" from the file "./file.service"
import { LoginService } from '../services/login.service';


//create new component
@Component({
	//his label in the HTML code
	selector: 'login',
	//the code that will be read when the component will be called
	templateUrl: './app/pages/login.component.html',
	//the style of the code
	styleUrls: ['./app/styles/login.component.css'],
	providers: [LoginService]
})

//the class of this new component
export class LoginComponent {
	public errorFlag: boolean=false;
	public alerts: Array<Object>=[];
	constructor(/*private router: Router, */private loginService: LoginService) {}

	login(): void {
		var userName = (<HTMLInputElement>document.getElementById("username")).value;
		var password = (<HTMLInputElement>document.getElementById("password")).value;

		//Parameters obj
		let params: URLSearchParams = new URLSearchParams();
		params.set('userName', userName);
		params.set('password', password);

		this.loginService.getAdmin(params).then((data: any) => {
			if(data.name=="MongoError")
				this.errorFlag=true;
			else {
				if (data[0] != "")
					window.location.href = '/adminPage';
				else {
					//warning=1
					//danger=2
					//success=3
					if (this.alerts.length > 0)
						this.alerts.splice(0, this.alerts.length);
					if ((userName != "") && (password != ""))
						this.alerts.push({msg: 'שם המשתמש או הסיסמה אינם נכונים.', type: 1});
					else
						this.alerts.push({msg: 'אנא מלא את כל הפרטים.', type: 2});
				}
			}
		});
	}
}