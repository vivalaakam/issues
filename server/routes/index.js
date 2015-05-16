var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/issues/:owner/:repo/:page', function(req, res) {
  var options = {
    url: 'https://api.github.com/repos/' + req.params.owner + '/' + req.params.repo + '/issues?per_page=10&page='+req.params.page,
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    var resp = {};

    switch (response.statusCode) {
      case 200:
        var str = response.headers.link;
        var re = /\<https:\/\/api.github.com\/repositories\/\d+\/issues\?per_page=(\d+)\&page=(\d+)\>; rel="(\w+)"/gmi;
        var headers = {};
        while ((m = re.exec(str)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }
          headers[m[3]] = m[2];
        }

        var info = JSON.parse(body);
        var ind = req.params.page * 10 - 1;
        resp = {
          pages: headers.last,
          values: info
        };
        res.json(resp);
        break;
      case 404:
        res.status(404)
          .send('Not found');
        break;
    }
  }
  request(options, callback);
});

router.get('/issue/:owner/:repo/:issue', function(req, res) {
  var options = {
    url: 'https://api.github.com/repos/' + req.params.owner + '/' + req.params.repo + '/issues/' + req.params.issue,
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    var resp = {};
    switch (response.statusCode) {
      case 200:
        var info = JSON.parse(body);
        resp = {
          values: info
        };
        res.json(resp);
        break;
      case 404:
        res.status(404)
          .send('Not found');
        break;
    }
  }
  request(options, callback);
});

router.get('/repositories/:owner', function(req, res) {
  var options = {
    url: 'https://api.github.com/users/' + req.params.owner + '/repos',
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    var resp = {};
    switch (response.statusCode) {
      case 200:
        var repos = JSON.parse(body);
        resp = {
          values: repos
        };
        res.json(resp);
        break;
      case 404:
        res.status(404)
          .send('Not found');
        break;
    }
  }
  request(options, callback);
});

module.exports = router;
