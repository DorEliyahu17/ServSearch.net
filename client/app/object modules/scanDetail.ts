//the "ScanDetail" class
export class ScanDetail {
	date: string;
	status: string;
	scanTime: string;
	scanPath: string;
	collection: string;
	totalScannedNumber: number;
	documentsNumber: number;
	directoriesNumber: number;
	filesNumber: number;

	constructor(){
		this.date="";
		this.status="";
		this.scanTime="";
		this.scanPath="";
		this.collection="";
		this.totalScannedNumber=0;
		this.documentsNumber=0;
		this.directoriesNumber=0;
		this.filesNumber=0;
	}
}