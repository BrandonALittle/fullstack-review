const express = require('express');
const db = require('../database/index.js');
const github = require('../helpers/github.js');
const parse = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parse.urlencoded({ extended: true }));
app.use(parse.json());

app.post('/repos', function (req, res) {
  let user = req.body.term;
  db.fetchRepos(user, function(results) {
    console.log(results);
    if (!results.length) {
      github.getReposByUsername(user, function(err, repos) {
        if (err) throw Error;
        repos = JSON.parse(repos);
        let mappedRepos = repos.map(function(repo) {
          return {
            user: repo.owner.login,
            repo: repo.name,
            repoLink: repo.html_url,
            watchers: repo.watchers_count
          };
        });
        db.save(mappedRepos);
        res.sendStatus(201);
      });
    } else {
      res.sendStatus(200);
    }

  });
});

app.get('/repos', function (req, res) {
  db.fetchRepos(function(results) {
    res.send(results.sort(0,25));
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

