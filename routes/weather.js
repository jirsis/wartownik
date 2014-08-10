var http = require('http');
var debug = require('debug')('wierzba');
var moment = require('moment-timezone');
var config = require('./wierzba');

var openweathermapUrl = 'http://api.openweathermap.org/data/2.5/';
var query = '/?lang=sp&q=';
var nextFiveDaysCommand = 'forecast';

var currentCity = 0;

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

var kmh2beaufort = function(kmh){
  var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
  for (var beaufort in speeds) {
    var speed = speeds[beaufort];
    if (speed > kmh) {
      return beaufort;
    }
  }
  return 12;
}

var error = function (res, city){
  res.end(JSON.stringify({
    "city": "city not found: "+city
  }));
}

var getOpenWeather = function(response){
  var url = openweathermapUrl + 'weather/?lang=sp&q=' + config.cities[currentCity];
  http.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
      try{
        var weather = JSON.parse(body);
        if(weather.cod === "404"){
          error(response, config.cities[currentCity]);
        }else{
          var sunrise = moment.unix(weather.sys.sunrise).tz(config.timezone);
          var sunset = moment.unix(weather.sys.sunset).tz(config.timezone);
          response.end(JSON.stringify({
            "temperature": Math.round((weather.main.temp-273.15)*10)/10,
            "windSpeed": kmh2beaufort(weather.wind.speed),
            "icon": weather.weather[0].icon,
            "iconName": iconTable[weather.weather[0].icon],
            "sunrise": sunrise.format('HH:mm'),
            "sunset": sunset.format('HH:mm'),
            "isDayLight": moment().isBefore(sunset) && moment().isAfter(sunrise),
            "city": weather.name
          }));
        }
      }catch(e){
        debug("error ocurred");
        response.end(JSON.stringify({
          "temperature": "N/A",
          "windSpeed": "N/A",
          "icon": "N/A",
          "iconName": iconTable[0],
          "sunrise": "N/A",
          "sunset": "N/A",
          "isDayLight": true,
          "city": config.cities[currentCity]
        }))
      }
    });
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });
}

var weather = function(response){
  var url = openweathermapUrl + 'weather' + query + config.cities[currentCity];
  getOpenWeather(response, url);
}

var nextWeeks = function (response){
  moment.lang(config.language);
  var city = config.cities[currentCity];
  var query = openweathermapUrl + 'forecast/daily?q=' + city+'&cnt=16&units=metric';
  debug(query);
  http.get(query, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var cityNameJson = "";
      var weatherJson = [];
      try{
        var weather = JSON.parse(body);
        cityNameJson = weather.city.name;
        weather.list.forEach(function(item){
          var date = moment.unix(item.dt);
          weatherJson.push({
            "date": date.format('YYYY-MM-DD'),
            "timestamp": date,
            "day": date.format('ddd'),
            "temp": {
              "max": Math.round(item.temp.max),
              "min": Math.round(item.temp.min)
            }
          })
        });
      }catch(e){
        debug("error in calling");
        cityNameJson = config.cities[currentCity];
        weatherJson  = [];
      }

      response.end(JSON.stringify({
          "city": cityNameJson,
          "weather16":weatherJson
      }));
      currentCity= (currentCity+1) % config.cities.length;
    });
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });
}

module.exports.current = weather;
module.exports.next = nextWeeks;
