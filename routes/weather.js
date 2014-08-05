var http = require('http');
var debug = require('debug')('wierzba');
var moment = require('moment-timezone');

var openweathermapUrl = 'http://api.openweathermap.org/data/2.5/';
var query = '/?lang=sp&q=';
var nextFiveDaysCommand = 'forecast';

var iconTable = {
  '01d':'wi-day-sunny',
  '02d':'wi-day-cloudy',
  '03d':'wi-cloudy',
  '04d':'wi-cloudy-windy',
  '09d':'wi-showers',
  '10d':'wi-rain',
  '11d':'wi-thunderstorm',
  '13d':'wi-snow',
  '50d':'wi-fog',
  '01n':'wi-night-clear',
  '02n':'wi-night-cloudy',
  '03n':'wi-night-cloudy',
  '04n':'wi-night-cloudy',
  '09n':'wi-night-showers',
  '10n':'wi-night-rain',
  '11n':'wi-night-thunderstorm',
  '13n':'wi-night-snow',
  '50n':'wi-night-alt-cloudy-windy'
}

var kmh2beaufort = function(kmh)
{
  var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
  for (var beaufort in speeds) {
    var speed = speeds[beaufort];
    if (speed > kmh) {
      return beaufort;
    }
  }
  return 12;
}


var getOpenWeather = function(response, query){
  debug(query);
  http.get(query, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        var weather = JSON.parse(body);
        var sunrise = moment.unix(weather.sys.sunrise).tz("Europe/Madrid");
        var sunset = moment.unix(weather.sys.sunset).tz("Europe/Madrid");
        response.end(JSON.stringify({
          "temperature": Math.round((weather.main.temp-273.15)*10)/10,
          "windSpeed": kmh2beaufort(weather.wind.speed),
          "icon": weather.weather[0].icon,
          "iconName": iconTable[weather.weather[0].icon],
          "sunrise": sunrise.format('HH:mm'),
          "sunset": sunset.format('HH:mm'),
          "isDayLight": moment().isBefore(sunrise) && moment().isAfter(sunset),
          "city": weather.name
        }));
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
