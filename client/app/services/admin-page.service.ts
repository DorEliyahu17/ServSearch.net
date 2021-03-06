//import the component declare in order to create a new one
import { Injectable }    from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminPageService {

    private apiUrl = 'http://localhost:3000/api';  // URL to web api
    //private apiUrl = 'http://192.168.1.15:3000/api';  // URL to web api

    constructor(private http: Http) { }

    getAH(): any {
        return this.http.get(this.apiUrl+"/AH")
            .map((response) => {
                return response.json()
            }).toPromise();
    }

    //get the bugs that reported from the /api/reportedBugs
    getBugs(): any {
        return this.http.get(this.apiUrl+"/reportedBugs")
            .map((response) => {
                return response.json()
            }).toPromise();
    }

    //delete array of bugs
    deleteBugs(params: URLSearchParams): any {
        return this.http.get(this.apiUrl+"/deleteBugs",  {search: params})
            .map((response) => {
                return response.json()
            }).toPromise();
    }

    //get the ToDos that reported from the /api/ToDoList
    getToDos(): any {
        return this.http.get(this.apiUrl+"/ToDoList")
            .map((response) => {
                return response.json()
            }).toPromise();
    }

    //delete array of ToDos
    deleteToDos(params: URLSearchParams): any {
        return this.http.get(this.apiUrl+"/deleteToDos",  {search: params})
            .map((response) => {
                return response.json()
            }).toPromise();
    }

    insertToDo(params: URLSearchParams): any {
        return this.http.get(this.apiUrl+"/insertToDo", {search: params})
            .map((response) => {
                return response.json()
            }).toPromise();
    }

    //get the Scan Results that reported from the /api/scanResults
    getScanResults(): any {
        return this.http.get(this.apiUrl+"/scanResults")
            .map((response) => {
                return response.json()
            }).toPromise();
    }
}