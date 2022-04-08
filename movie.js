const { getMovieList } = require('movie-list-node');
const prompt = require('prompt');

prompt.start();
prompt.get(['MovieName'], function (err,result) {
    err ? console.log(err) :
    getMovieList(result.MovieName);
});

