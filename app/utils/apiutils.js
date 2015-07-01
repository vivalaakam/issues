var actions = require('../actions/actions');
var request = require('superagent');
var Promise = require('promise/lib/es6-extensions');
module.exports = {
    loadIssues: function(owner, repo) {
        return new Promise(function(resolve, reject) {
            request
                .get('https://api.github.com/repos/' + owner + '/' + repo + '/issues')
                .send({})
                .end(function(error, res) {
                    if (res) {
                        var data = JSON.parse(res.text);
                        if (res.status === 200) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    }
                });
        });
    },
};
