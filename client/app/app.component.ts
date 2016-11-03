//import the component declare in order to create a new one
import { Component } from '@angular/core';

// Add the RxJS Observable operators.
import './rxjs-operators';

//create new component
@Component({
	//his label in the HTML code
	selector: 'main',
	//the code that will be read when the component will be called
	templateUrl: 'app/pages/app.component.html',
  	styleUrls: ['app/styles/app.component.css']
})
export class AppComponent {
	title = 'ServSearch.net';
}