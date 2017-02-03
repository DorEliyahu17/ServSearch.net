//import the component declare in order to create a new one
import { Injectable }    from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import the class "File" from the file "./file"
import { User } from '../object modules/user';

@Injectable()
export class LoginService {

    private apiUrl = 'http://localhost:3000/api';  // URL to web api
    //private apiUrl = 'http://192.168.1.15:3000/api';  // URL to web api

    constructor(private http: Http) { }

    //get the admin from the /api/admins
    getAdmin(params: URLSearchParams): any {
        return this.http.get(this.apiUrl+"/admins", {search: params})
            .map((response) => {
                return response.json()
            }).toPromise();
    }
}