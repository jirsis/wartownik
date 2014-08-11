var debug = require('debug')('wierzba');
var router = require("express").Router();
var config = require('./wierzba');

var header = require('./headers');
var time = require('./time');
var weather = require('./weather');
var news = require('./news');
var calendar = require('./calendar');
var setup = require('./setup');

router.get('/', function(req, res){
  res.render('wierzba', {});
})

router.get('/help', function(req, res) {
  res.render('index', {
    "title": "Wierzba",
    "commands": [
      {"name": "Time", "uri": "/time"},
      {"name": "Current weather at a defined city", "uri": "/current-weather"},
      {"name": "Next 16 days weather at a defined city", "uri": "/next-weather"},
      {"name": "Personal calendar", "uri": "/calendar"},
      {"name": "News", "uri": "/news"},
    ]
    });
});

router.get('/time', function(req, res) {
  header.setHeaders(res);
  time(res);
});

router.get('/current-weather', function(req, res){
  header.setHeaders(res);
  weather.current(res);
});

router.get('/next-weather', function(req, res){
  header.setHeaders(res);
  weather.next(res);
});

router.get('/news', function(req, res){
  header.setHeaders(res);
  news(res);
});

router.get("/calendar", function(req, res) {
  header.setHeaders(res);
  calendar(res);
});

router.get('/config', function(req, res){
  res.render('config', config);
});

router.post('/config', function(req, res){
  setup(req, res);
});

module.exports = router;
