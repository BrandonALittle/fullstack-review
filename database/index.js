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
  Repo.find({'repoLink': repoData.repoLink}, function(err, docs) {
    if (err) throw Error;
    if (!docs.length) {
      Repo.create(repoData, function(err, newRepo) {
       if (err) throw Error;
      });
    }
  });
}

let fetchRepos = (user, callback) => {
  Repo.find({'user':user}, function(err, docs) {
    docs = docs.sort(function(a, b) {
      return a.watchers - b.watchers;
    });
    callback(docs);
  });
}

module.exports.save = save;
module.exports.fetchRepos = fetchRepos;