//import the component declare in order to create a new one
import { Injectable }    from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import the class "File" from the file "./file"
import { File } from '../object modules/file';

@Injectable()
export class FileService {
	Files: File[];
	private apiUrl = 'http://localhost:3000/api';  // URL to web api
	//private apiUrl = 'http://192.168.1.15:3000/api';  // URL to web api

	//promise=callback
	constructor(private http: Http) { }

	//get all the files in the /api/files
	getFiles(params: URLSearchParams): any {
		return this.http.get(this.apiUrl+"/files", {search: params})
            .map((response) => {
				return response.json()
			}).toPromise();
	}

	getServerNames(): any
	{
		return this.http.get(this.apiUrl+"/collections")
            .map((response) => {
				return response.json()
			}).toPromise();
	};
}