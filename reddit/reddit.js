const reddit = require('../app.js');

let getPosts = function(limit = 5) {
  return reddit.r.get_subreddit('megalinks').get_new({limit: limit});
};


module.exports = {
  getPosts: getPosts
};
