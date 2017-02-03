//host configuration with connection settings and commands
var host = {
    server:        {
        host:         "192.168.85.1",
        userName:     "admin",
        password:     "root1234",
    },
    commands:      [ "echo $(pwd)", "ls -l" ]
};
/*127.0.10.1*/
/*1.1.1.13*/
/*192.168.85.1*/
var SSH2Shell = require ('ssh2shell');

//Create a new instance passing in the host object
SSH = new SSH2Shell(host);

//Use a callback function to process the full session text
//Start the process
SSH.connect(function(sessionText){
    console.log(sessionText)
});