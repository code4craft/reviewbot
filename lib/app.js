var http = require("http");
var exec = require("child_process").exec

var scripts = {
	"master":"sh /home/vexplore/deploy-scripts/deploy-vexplore-it",
	"stage":"sh /home/vexplore/deploy-scripts/deploy-vexplore-it"
}

function hasCommitOnBranch(data,branch){
	if(!data){return false;}
	if(!data.commits){return false;}
	var commits = data.commits.filter(function(commit){
		return commit.branch == branch;
	});
	return !!commits.length;
}

function logMessages(data){
	if(!data){return false;}
	if(!data.commits){return false;}
	return data.commits.forEach(function(commit){
		console.log(commit.branch + ": " + commit.message);
	});
}

var server = http.createServer(function(req,res){
	var body = "";
	req.on('data',function(chunk){
		body += chunk.toString();
	});
	req.on('end',function(){
		try{
			body = decodeURIComponent(body);
			var data = JSON.parse(body);

		}catch(e){
			console.error(e,body);
		}
	});
});

exec("mkdir -p /data/reviewbot/");

server.listen(8888);