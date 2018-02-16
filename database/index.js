const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  user: String,
  repo: String,
  repoLink: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData) => {
  Repo.find(repoData, function(err, docs) {
    if (err) throw Error;
    if (docs.length === 0) {
      Repo.create(repoData, function(err, newRepo) {
       if (err) throw Error;
      });
    }
  });
}

let fetchRepos = (callback) => {
  Repo.find({}, function(err, docs) {
    docs = docs.sort(function(a, b) {
      return b.watchers - a.watchers;
    });
    callback(docs);
  });
}

module.exports.save = save;
module.exports.fetchRepos = fetchRepos;