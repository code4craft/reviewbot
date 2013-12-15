// http://nodejs.org/api.html#_child_processes
var parser = require('../lib/requestParser.js');

var parse = parser.parse(require("../call.json"));
console.log(parse)