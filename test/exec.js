// http://nodejs.org/api.html#_child_processes
var exec = require('child_process').exec;
var child;

// executes `pwd`
child = exec("", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
});