//import the component declare in order to create a new one
import { Injectable }    from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import the class "BugReport" from the file "../object modules/bug-report"
import { BugReport } from '../object modules/bug-report';

@Injectable()
export class BugReportService {

    private apiUrl = 'http://localhost:3000/api';  // URL to web api
    //private apiUrl = 'http://192.168.1.15:3000/api';  // URL to web api

    constructor(private http: Http) { }

    //get the bugs that reported from the /api/reportedBugs
    getBugs(): any {
        return this.http.get(this.apiUrl+"/reportedBugs")
            .map((response) => {
                return response.json()
            }).toPromise();
    }

    insertBug(bug: BugReport): any {

    }
}