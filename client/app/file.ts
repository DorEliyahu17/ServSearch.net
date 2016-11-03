//the "file" class
export class File {
	name: string;
	type: string;
	size: number; //everything will be in bytes and in the code it will be converted to kilo or mega bytes
	location: string;
	permissions: string;
	createdUser: string;
	modifiedDate: string;
}