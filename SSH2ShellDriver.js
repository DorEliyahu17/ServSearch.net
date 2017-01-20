//host configuration with connection settings and commands
var host = {
    server:        {
        host:         "127.0.0.1",
        userName:     "test",
        password:     "1234",
    },
    commands:      [ "echo $(pwd)", "ls -l" ]
};

var SSH2Shell = require ('ssh2shell');

//Create a new instance passing in the host object
SSH = new SSH2Shell(host);

//Use a callback function to process the full session text
//Start the process
SSH.connect(function(sessionText){
    console.log(sessionText)
});