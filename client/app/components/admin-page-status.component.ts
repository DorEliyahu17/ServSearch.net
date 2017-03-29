//import the component declare in order to create a new one
import { Component } from '@angular/core';

// Add the RxJS Observable operators.
import '../rxjs/rxjs-operators';

//create new component
@Component({
	//his label in the HTML code
	selector: 'admin-status',
	//the code that will be read when the component will be called
	templateUrl: './app/pages/admin-page-status.component.html',
  	styleUrls: ['./app/styles/admin-page-status.component.css']
})
export class AdminPageStatusComponent {}