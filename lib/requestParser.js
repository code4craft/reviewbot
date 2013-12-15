function parse(data) {
    var author = data.commits[0].author.name;
    var email = data.commits[0].author.email;
    var branch = /refs\/heads\/(\w+)/.exec(data.ref)[1];
    var url = data.repository.url;
    var name = data.repository.name;
    return {
        "name": name,
        "author": author,
        "email": email,
        "branch": branch,
        "url": url
    }
}

exports.parse = parse;