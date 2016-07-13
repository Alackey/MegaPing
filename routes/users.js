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

      megaPosts.on('end', () => {
        callback(jsonRes);
      });
    });
  };

  posts(function(allPosts) {
    console.log(JSON.parse(allPosts).data.children[0]);
    res.send(allPosts);
  });

});

module.exports = router;
