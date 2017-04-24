//the "file" class
export class File {
	name: string;
	type: string;
	size: number; //everything will be in bytes and in the code it will be converted to kilo or mega bytes
	location: string;
	createdUser: string;
	group: string;
	modifiedDate: string;

	constructor(){
		this.name="";
		this.type="";
		this.size=0; //everything will be in bytes and in the code it will be converted to kilo or mega bytes
		this.location="";
		this.createdUser="";
		this.group="";
		this.modifiedDate="";
	}
}