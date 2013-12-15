function parse(data) {
    var author = data.commits[0].author.name;
    var email = data.commits[0].author.email;
    var branch = /refs\/heads\/(\w+)/.exec(data.ref)[1];
    return {
        "author": author,
        "email": email,
        "branch": branch
    }
}

exports.parse = parse;