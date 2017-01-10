//import the component declare in order to create a new one
import {Component, Input} from '@angular/core';
import { URLSearchParams } from "@angular/http";

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
	user = new User();

	constructor(private loginService: LoginService) {
	}

	login(): void {
		var userName = (<HTMLInputElement>document.getElementById("userName")).value;
		var password = (<HTMLInputElement>document.getElementById("password")).value;

		//Parameters obj
		let params: URLSearchParams = new URLSearchParams();
		params.set('userName', userName);
		params.set('password', password);

		this.loginService.getAdmin(params).then((data: User[]) => {
			/*var i;
			for (i = 0; i < data.length; i++) {*/
			if(data[0]!=undefined)
				console.log("success login");
			else
				console.log("wrong user name or password");
				/*if ((data[0].userName == userName) && (data[0].password == password)) {
					console.log("data.userName="+data[0].userName+" data.password="+data[0].password);
				}*/
			//}
		});
	}
}