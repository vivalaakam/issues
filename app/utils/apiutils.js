var actions = require('../actions/actions');
var request = require('superagent');
var Promise = require('promise/lib/es6-extensions');
module.exports = {
    loadIssues: function(owner, repo, page) {
        return new Promise(function(resolve, reject) {
            request
                .get('https://api.github.com/repos/' + owner + '/' + repo + '/issues?page=' + page)
                .send({})
                .end(function(error, res) {
                    if (res) {
                        var data = {};
                        data.issues = JSON.parse(res.text);
                        if (res.status === 200) {

                            var str = res.headers.link;
                            var re = /<https:\/\/api.github.com\/repositories\/\d+\/issues\?(per_page=(\d+)\&)?page=(\d+)\>; rel="(\w+)"/gmi;
                            var headers = {};
                            while ((m = re.exec(str)) !== null) {
                                if (m.index === re.lastIndex) {
                                    re.lastIndex++;
                                }
                                headers[m[4]] = m[3];
                            }
                            data.pages = headers.last || +headers.prev + 1;

                            resolve(data);
                        } else {
                            reject(data);
                        }
                    }
                });
        });
    },
};
