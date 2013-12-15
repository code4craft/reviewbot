var exec = require("child_process").exec
var sys = require('sys')
var fs = require("fs")

function cloneOrPull(path, name, url, branch, callback) {
    var repoDir = path + "/" + name;
    if (!fs.existsSync(repoDir)) {
        exec("cd " + path + ";git clone " + url, function (error, stdout, stderr) {
            sys.print(stdout);
            sys.print(stderr);
            callback.call();
        });
    } else {
        exec("cd " + repoDir + ";git pull " + url + " " + branch, function (error, stdout, stderr) {
            sys.print(stdout);
            sys.print(stderr);
            callback.call();
        });
    }
}

function commitAndPush(path, name, url, branch, message) {
    var repoDir = path + "/" + name;
    exec("cd " + repoDir + ";git add .;git add -u;git commit -m '" + message + "';git push " + url + " " + branch, function (error, stdout, stderr) {
        sys.print(stdout);
        sys.print(stderr);
    });
}

exports.cloneOrPull = cloneOrPull;
exports.commitAndPush = commitAndPush;
