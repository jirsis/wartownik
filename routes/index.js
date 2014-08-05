var express = require("express");
var router = express.Router();

var header = require('./headers');
var time = require('./time');
var weather = require('./weather');
var news = require('./news');

router.get('/', function(req, res) {
  res.render('index', {
    "title": "Wierzba",
    "commands": [
      {"name": "Time", "uri": "/time/:lang"},
      {"name": "Current weather at a defined city", "uri": "/current-weather/:city"},
      {"name": "Next 16 days weather at a defined city", "uri": "/next-weather/:city"},
      {"name": "Personal calendar", "uri": "/calendar"},
      {"name": "News", "uri": "/news"},
    ]
    });
});

router.get('/time/:lang', function(req, res) {
  header.setHeaders(res);
  time(res, req.params['lang']);
});

router.get('/current-weather/:city', function(req, res){
  header.setHeaders(res);
  weather.current(res, req.params['city']);
});

router.get('/next-weather/:city', function(req, res){
  header.setHeaders(res);
  weather.next(res, req.params['city']);
});

router.get('/calendar', function(req, res){
  header.setHeaders(res);
  calendar.show(res);
});

router.get('/news', function(req, res){
  header.setHeaders(res);
  news(res);
});

router.get('/wierzba', function(req, res){
  res.render('wierzba', {});
})

module.exports = router;
