var express = require('express');
var router = express.Router();

var time = require('./time');
var weather = require('./weather');

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/time', function(req, res) {
  time(res);
});

router.get('/weather', function(req, res){
  weather(res);
})

router.get('/template', function(req, res){
  res.render('template', {});
})

module.exports = router;
