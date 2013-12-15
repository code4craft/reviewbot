var fs = require("fs");
var bot = require("./bot.js");

function scan(path) {
    doScan(path);
}
function doScan(path) {
    try {
        fs.readdir(path, function (err, files) {
            files.forEach(function (file) {
                file = path + "/" + file;
                stat = fs.lstatSync(file);
                if (stat.isDirectory()) {
                    doScan(file);
                } else {
                    bot.operate(file);
                }
            });
        });
    } catch (e) {
        console.log(path)
    }
}

exports.scan = scan;