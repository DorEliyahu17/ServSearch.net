//import the component declare in order to create a new one
import { Injectable }    from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import the class "BugReport" from the file "../object modules/bug-report"
import { BugReport } from '../object modules/bug-report';

@Injectable()
export class BugReportService {

    constructor(private http: Http) { }

    //get the bugs that reported from the /api/reportedBugs
    getBugs(): any {
        return this.http.get("http://localhost:3000/api/reportedBugs")
            .map((response) => {
                return response.json()
            }).toPromise();
    }

    insertBug(bug: BugReport): any {

    }
}