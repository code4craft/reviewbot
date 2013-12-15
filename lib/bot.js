var fs = require("fs")
var config = require("../config.json").bot

//todo:global message
var message = "";

function detectSeperator(content) {
    if (content.indexOf("\r\n") >= -1) {
        return "\r\n";
    } else {
        return "\n";
    }
}

function operate(file) {
    var changed = false;
    if (file.search(new RegExp(config.file, 'i')) >= 0) {
        console.log("get file "+file)
        var content = fs.readFileSync(file).toString(config.encoding ? config.encoding : "utf-8");
        var seperator = detectSeperator(content);
        var lines = content.split(seperator);
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            config.fragment.forEach(function (fragment) {
                if (line.search(new RegExp(fragment.search,"i")) >= 0) {
                    //TODO:regex support
                    if (fragment.replace) {
                        lines[i] = line.replace(fragment.search, fragment.replace);
                        changed = true;
                    }
                    if (fragment.message) {
                        message += (fragment.message + "@" + file + "line:" + i);
                    }
                }
            })
        }
        if (changed) {
            content = lines.join(seperator)
            fs.writeFile(file, content);
        }
    }
    return changed;
}

function commitMessage() {
    if (message){
        var messageTmp = message;
        message = "";
        return messageTmp;
    }
    if (config.commit) {
        return config.commit[Math.floor(Math.random() * config.commit.length)]
    } else {
        return "机器人也很懒，只留下一个'update'，不过反正有问题就是了！"
    }

}

exports.operate = operate;
exports.commitMessage = commitMessage;