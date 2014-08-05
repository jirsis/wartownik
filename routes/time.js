var ntpClient = require('ntp-client');
var moment = require('moment-timezone');
var debug = require('debug')('wierzba');


var time = function(res, lang){
  ntpClient.getNetworkTime('pool.ntp.org', 123, function(err, date) {
    var locale = require('./i18n/'+lang+'.json');
    if(err) {
      console.error(err);
      date = new Date();
    }
    time = moment(date).tz("Europe/Madrid");
    res.end(JSON.stringify({
      "time": time.format(),
      "dayOfTheWeek": locale.days[date.getDay()],
      "month": locale.months[date.getMonth()],
      "date": time.format('dddd, D MMMM YYYY'),
      'hours': ''
    }));
  });
}

module.exports = time;
