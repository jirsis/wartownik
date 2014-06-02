var express = require('express');
var router = express.Router();

var time = require('./time');

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/time', function(req, res) {
  time('time', res);
});

module.exports = router;
