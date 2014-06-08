var ntpClient = require('ntp-client');
var moment = require('moment-timezone');
var header = require('./headers');

var time = function(res){
  ntpClient.getNetworkTime("pool.ntp.org", 123, function(err, date) {
    if(err) {
      console.error(err);
      return;
    }
    header.setHeaders(res);
    time = moment(date).tz('Europe/Madrid');
    res.end(JSON.stringify({time: time.format()}));
  });
}

module.exports = time;
