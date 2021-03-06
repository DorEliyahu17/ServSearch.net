"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//the "file" class
var File = (function () {
    function File() {
        this.name = "";
        this.type = "";
        this.size = 0; //everything will be in bytes and in the code it will be converted to kilo or mega bytes
        this.location = "";
        this.createdUser = "";
        this.group = "";
        this.modifiedDate = "";
    }
    return File;
}());
exports.File = File;
//# sourceMappingURL=file.js.map