var http = require('http');
var debug = require('debug')('wierzba');

var openweathermapUrl = 'http://api.openweathermap.org/data/2.5/';
var query = '/?lang=sp&q=';
var nextFiveDaysCommand = 'forecast';

var getOpenWeather = function(response, query){
  debug(query);
  http.get(query, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        var weatherResponse = JSON.parse(body)
        response.end(JSON.stringify(weatherResponse));
    });
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });
}

var weather = function(response, city){
  var url = openweathermapUrl + 'weather' + query + city;
  getOpenWeather(response, url);
}

var nextWeeks = function (response, city){
  var url = openweathermapUrl + 'forecast/daily' + query + city+'&cnt=16';
  getOpenWeather(response, url);
}

module.exports.current = weather;
module.exports.next = nextWeeks;
