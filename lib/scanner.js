var fs = require("fs");
var bot = require("./bot.js");

exports.scan = function scan(path) {
    try {
        fs.readdir(path, function (err, files) {
            files.forEach(function (file) {
                file = path + "/" + file;
                stat = fs.lstatSync(file);
                if (stat.isDirectory()) {
                    scan(file);
                } else {
                    bot.operate(file);
                }
            });
        });
    } catch (e) {
        console.log(path)
    }
}