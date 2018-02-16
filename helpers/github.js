const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  let searchUrl = `https://api.github.com/users/${user}/repos`;
  let options = {
    url: searchUrl,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
  };
  request(options, function(err, res, body = []) {
    if (err) throw Error;
    callback(err, body);
  });

}

module.exports.getReposByUsername = getReposByUsername;