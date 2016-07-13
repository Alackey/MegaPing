var express = require('express');
var router = express.Router();
var https = require('https');

/* GET users listing. */
router.get('/', function(req, res, next) {

  let posts = function(callback) {
    https.get('https://www.reddit.com/r/megalinks/new.json?limit=2', function(megaPosts) {

      megaPosts.setEncoding('utf8');

      let jsonRes = '';
      megaPosts.on('data', (d) => {
        jsonRes += d;
      });

      megaPosts.on('end', function() {
        let parsed = JSON.parse(JSON.stringify(jsonRes));
        callback(parsed);
      });
    });
  };

  posts(function(allPosts) {
    res.send(allPosts);
  });

});

module.exports = router;
