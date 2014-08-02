var express = require('express');
var router = express.Router();

var header = require('./headers');
var time = require('./time');
var weather = require('./weather');

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/time', function(req, res) {
  header.setHeaders(res);
  time(res);
});

router.get('/current-weather/:city', function(req, res){
  header.setHeaders(res);
  weather.current(res, req.params['city']);
});

router.get('/next-weather/:city', function(req, res){
  header.setHeaders(res);
  weather.next(res, req.params['city']);
});

router.get('/template', function(req, res){
  res.render('template', {});
})

module.exports = router;
