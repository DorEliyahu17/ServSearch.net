//the "bug-report" class
export class BugReport {
    _id: string;
    insertDate: string;
    name: string;
    subject: string;
    description: string;

    constructor(){
        this._id="";
        this.insertDate="";
        this.name="";
        this.subject="";
        this.description="";
    }
}