var debug = require('debug')('wierzba');
var cheerio = require('cheerio');
var http = require('http');

var newsRepository = [];

var parseRss = function($){
  $('item').each(function(index, item){
    var abstract$ = cheerio.load($('<div>').html($('description', this).html()).text());
    var abstract = abstract$('p').first().text();
    newsRepository.push({
      "title": $('title', this).text(),
      "abstract" : abstract
    });
  });
}

var generateResponse = function(response){
  response.end(JSON.stringify(newsRepository.pop()));
}

var reloadNewsRepository = function(response){
  var rss = 'http://meneame.feedsportal.com/rss';
  http.get(rss, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
      parseRss(cheerio.load(body, {"xmlMode":true}));
      generateResponse(response);
    });
  }).on('error', function(e) {
    debug("Got error: ", e);
  });
}

var news = function(response){
  if (newsRepository.length <= 1 ){
    reloadNewsRepository(response);
  }else{
    generateResponse(response);
  }
}

module.exports = news;
