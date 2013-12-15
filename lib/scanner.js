var fs = require("fs");

function scan(path, bot) {
    console.log("start to scan " + path)
    var changed = doScan(path, bot);
    return changed;
}

function doScan(path, bot) {
    var changed = false;
    var files = fs.readdirSync(path);
    files.forEach(function (file) {
        file = path + "/" + file;
        stat = fs.lstatSync(file);
        var operateChanged = false;
        if (stat.isDirectory()) {
            operateChanged = doScan(file, bot);
        } else {
            operateChanged = bot.operate(file);
        }
        if (operateChanged) {
            changed = true;
        }
    });
    return changed;
}

exports.scan = scan;