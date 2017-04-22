//import the component declare in order to create a new one
import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import the class "File" from the file "./file"
import { ScanDetail } from '../object modules/scanDetail';

@Injectable()
export class CompareService {

    private apiUrl = 'http://localhost:3000/api';  // URL to web api
    //private apiUrl = 'http://192.168.1.15:3000/api';  // URL to web api

    constructor(private http: Http) { }

    //get the admin from the /api/admins
    getSortedScanResult(): any {
        return this.http.get(this.apiUrl+"/scanResults")
            .map((response) => {
                return response.json()
            }).toPromise();
    }
}