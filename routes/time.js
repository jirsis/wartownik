var ntpClient = require('ntp-client');


var time = function(template, res){
  ntpClient.getNetworkTime("pool.ntp.org", 123, function(err, date) {
    if(err) {
      console.error(err);
      return;
    }
    res.render(template, {time: date.toJSON()});
  });
}

module.exports = time;
