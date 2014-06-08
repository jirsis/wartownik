var ntpClient = require('ntp-client');
var header = require('./headers');

var time = function(res){
  ntpClient.getNetworkTime("pool.ntp.org", 123, function(err, date) {
    if(err) {
      console.error(err);
      return;
    }
    header.setHeaders(res);
    res.end(JSON.stringify({time: date.toJSON()}));
  });
}

module.exports = time;
