var fs = require("fs");

function scan(path,bot) {
    var changed = doScan(path,bot);
    return changed;
}

function doScan(path,bot) {
    var changed = false;
    try {
        fs.readdir(path, function (err, files) {
            files.forEach(function (file) {
                file = path + "/" + file;
                stat = fs.lstatSync(file);
                var operateChanged = false;
                if (stat.isDirectory()) {
                    operateChanged = doScan(file);
                } else {
                    operateChanged = bot.operate(file);
                }
                if (operateChanged) {
                    changed = true;
                }
            });
        });
    } catch (e) {
        console.log(path)
    }
    return changed;
}

exports.scan = scan;