var debug = require('debug')('wierzba');
var cheerio = require('cheerio');
var http = require('http');

var newsRepository = [];

var parseRss = function($){
  $('item').each(function(index, item){
    newsRepository.push({
      "title": $('title', this).text(),
      "description" : $('description', this).html().split('&gt;')[2].split('&lt;')[0]
    });
  });
}

var reloadNewsRepository = function(){
  var rss = 'http://meneame.feedsportal.com/rss';
  http.get(rss, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
      parseRss(cheerio.load(body, {"xmlMode":true}));
    });
  }).on('error', function(e) {
    debug("Got error: ", e);
  });
}

var news = function(response){

  if (newsRepository.length <= 1 ){
    reloadNewsRepository();
    response.end(JSON.stringify(newsRepository.pop()));
  }
  response.end(JSON.stringify(newsRepository.pop()));
}

module.exports = news;
