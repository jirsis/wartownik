var ical = require('ical');
var debug = require('debug')('wierzba');

var calendar = function(res){
  var icalURL = 'https://www.google.com/calendar/ical/tggh6736d5ve3sqmhk46msej6s%40group.calendar.google.com/private-0debcd9675bb0a9ccc8b708ba9bab0e4/basic.ics';
  debug(icalURL);
  ical.fromURL(icalURL, {}, function(err, data) {
    debug(JSON.stringify(data));
  });
  res.end(JSON.stringify({status: "ok"}));
}

module.exports = calendar;
