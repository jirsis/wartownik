var ical = require('ical');
var moment = require('moment-timezone');
var debug = require('debug')('wierzba');
var config = require('./wierzba');
var dateFormatter = "L";


var calendar = function(res){
  var icalURL = config.calendar;
  moment.locale(config.language);

  var now = moment();
  var nextHour = moment().add(1, 'hour');

  ical.fromURL(icalURL, {}, function(err, data) {
    var vevents = [];

    for (var k in data){
      var vevent = {};
      var ev = data[k];
      var end;
      var start;
      if( ev.type === 'VEVENT'){
        if ( ev.rrule === undefined){//regular date
          start = moment(ev.start).tz(config.timezone);
          if (nextHour.isBefore(start)){
            end = moment(ev.end).tz(config.timezone);
            if ( now.isBefore(end)){
              vevents.push({
                "start": start.format(dateFormatter),
                "summary": ev.summary
                });
            }
          }
        }else{ //periodic date, like as a birthday
          var vevent = {};
          var start = moment(ev.start).tz(config.timezone);
          start = start.format("DD/MM/")+now.get("year")+" 23:59:59";
          start = moment(start, "DD/MM/YYYY HH:mm:ss");
          if ( now.isBefore(start)){
            vevents.push({
              "start": start.format(dateFormatter),
              "summary": ev.summary
            })
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
