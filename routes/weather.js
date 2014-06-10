var http = require('http');

var url = 'http://api.openweathermap.org/data/2.5/weather?lang=sp&q=';

var weather = function(response, city){
  var queryWeather = url+city;
  http.get(queryWeather, function(res) {
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

module.exports.current = weather;
