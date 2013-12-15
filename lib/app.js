var http = require("http");
var exec = require("child_process").exec
var parser = require("./requestParser")
var repo = require("./repo")
var bot = require("./bot")
var scanner = require("./scanner")
var config = require("../config")


function run() {
    var server = http.createServer(function (req, res) {
        var body = "";
        req.on('data', function (chunk) {
            body += chunk.toString();
        });
        req.on('end', function () {
            try {
                body = decodeURIComponent(body);
                var data = parser.parse(JSON.parse(body));
                if (config.branch.indexOf(data.branch) >= 0) {
                    repo.cloneOrPull(config.path, data.name, data.url, data.branch, function () {
                        var changed = scanner.scan(config.path + "/" + data.name, bot);
                        if (changed) {
                            repo.commitAndPush(config.path, data.name, data.url, data.branch, bot.commitMessage().replace("${author}", data.author));
                        }
                    });
                }
            } catch (e) {
                console.error(e, body);
            }
            res.writeHead(200);
        });
    });
    exec("mkdir -p " + config.path);
    console.log("start to listen on port " + config.port);
    console.log("try to set your gitlab hook to http:://your-host:" + config.port + "/");
    server.listen(config.port);
}

exports.run = run;