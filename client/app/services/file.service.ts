//import the component declare in order to create a new one
import { Injectable }    from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import the class "File" from the file "./file"
import { File } from '../object modules/file';



@Injectable()
export class FileService {
	//privates
	Files: File[];

	//private headers = new Headers({'Content-Type': 'application/json'});
	//private filesUrl = 'http://localhost:3000/api/files';  // URL to web api

	//promise=callback
	constructor(private http: Http) { }

	//get all the files in the /api/files
	getFiles(params: URLSearchParams): any {
		return this.http.get("http://localhost:3000/api/files", {search: params})
            .map((response) => {
				return response.json()
			}).toPromise();
	}

	getServerNames(): any
	{
		return this.http.get("http://localhost:3000/api/collections")
            .map((response) => {
				return response.json()
			}).toPromise();
	};

	//function that split the name of the server from the hole path
	getServerFromLocation(location): string
	{
		var arr=[];
		arr=location.split(":");
		return arr[0];
	}

	//error handler
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}

/*
 //get all the files in the /api/files
 getFiles(): Promise<File[]> {
 return this.http.get("http://localhost:3000/api/files")
 .toPromise()
 .then(response => response.json().data as File[]/* && console.log(response)/)
 .catch(this.handleError);
 }

 //get specified file from the /api/files
 getFile(name, type, server): Promise<File>{
 console.log("getFile: name:"+name+" type:"+type+" server:"+server);
 if((name!=null)&&(type!=null)&&(server!=null)){
 return this.getFiles()
 .then(Files => Files.find(file => ((file.name === name) && (file.type === type) && (this.getServerFromLocation(file.location)===server))));
 }
 else if((name!=null)&&(type!=null)){
 return this.getFiles()
 .then(Files => Files
 .find(file => ((file.name === name) && (file.type === type))));
 }
 else if((type!=null)&&(server!==null)){
 return this.getFiles()
 .then(Files => Files
 .find(file => ((file.type === type) && (this.getServerFromLocation(file.location)===server))));
 }
 else if((name!=null)&&(server!=null)){
 return this.getFiles()
 .then(Files => Files
 .find(file => ((file.name === name) && (this.getServerFromLocation(file.location)===server))));
 }
 else if(name!=null){
 return this.getFiles()
 .then(Files => Files
 .find(file => (file.name === name)));
 }
 else if(type!=null){
 return this.getFiles()
 .then(Files => Files
 .find(file => (file.type === type)));
 }
 else{
 return this.getFiles()
 .then(Files => Files
 .find(file => (this.getServerFromLocation(file.location)===server)));
 }
 }
 */