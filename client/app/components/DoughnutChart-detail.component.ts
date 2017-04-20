//import the component declare in order to create a new one
import { Component } from '@angular/core';

// Add the RxJS Observable operators.
import '../rxjs/rxjs-operators';

//create new component
@Component({
	//his label in the HTML code
	selector: 'DoughnutChart-detail',
	//the code that will be read when the component will be called
	templateUrl: './app/pages/BarChart-detail.component.html'
})
export class DoughnutChartDetailComponent {
	public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	public doughnutChartData:number[] = [350, 450, 100];
	public doughnutChartType:string = 'doughnut';

	// events
	public chartClicked(e:any):void {
		console.log(e);
	}

	public chartHovered(e:any):void {
		console.log(e);
	}
}