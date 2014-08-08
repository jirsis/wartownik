var ical = require('ical');
var moment = require('moment-timezone');
var debug = require('debug')('wierzba');
var config = require('./wierzba');
var dateFormatter = "DD/MM/YY HH:mm";


var calendar = function(res){
  var icalURL = config.calendar;
  moment.lang(config.language);

  var now = moment();
  var nextHour = moment().add('hour', 1);

  ical.fromURL(icalURL, {}, function(err, data) {
    var vevents = [];
    for (var k in data){
      var vevent = {};
      var ev = data[k];
      var end;
      if( ev.type === 'VEVENT'){
        vevent.start = moment(ev.start).tz(config.timezone)
        if (nextHour.isBefore(vevent.start)){
          vevent.start = vevent.start.format(dateFormatter);
          end = moment(ev.end).tz(config.timezone);
          if ( now.isBefore(end)){
            vevent.summary = ev.summary;
            vevents.push(vevent);
          }
        }
      }
    }
    vevents.sort(function(a, b){
      var msA = moment(a.start, dateFormatter).format('X');
      var msB = moment(b.start, dateFormatter).format('X');
      return msA - msB;
    });
    res.end(JSON.stringify({
      "calendar": vevents.slice(0, 10)
      }));
  });

}

module.exports = calendar;
