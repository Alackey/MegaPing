var express = require('express');
var router = express.Router();
const reddit = require('../reddit/reddit.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

  reddit.getPosts().then((posts) => {
    res.send(posts);
  });
});

module.exports = router;
