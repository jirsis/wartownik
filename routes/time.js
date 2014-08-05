var ntpClient = require('ntp-client');
var moment = require('moment-timezone');
var debug = require('debug')('wierzba');


var time = function(res, lang){
  ntpClient.getNetworkTime('pool.ntp.org', 123, function(err, date) {
    if(err) {
      console.error(err);
      date = new Date();
    }
    moment.lang(lang);
    time = moment(date).tz("Europe/Madrid");
    res.end(JSON.stringify({
      "timestamp": time.format(),
      "date": time.format('dddd, D MMMM YYYY')
    }));
  });
}

module.exports = time;
