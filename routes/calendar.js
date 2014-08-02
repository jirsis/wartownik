var gcal = require('google-calendar');
var debug = require('debug')('wierzba');
var config = require('./calendar.json');

var calendar = function(res){
  res.end(JSON.stringify(config.accessToken));
}

module.exports.show = calendar;
