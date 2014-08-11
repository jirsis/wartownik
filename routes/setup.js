var fs = require('fs');

var setup = function ( req, res){
  var cities = [];
  req.param('new-city').slice(',').forEach(function(item){
    if(item.length>0){
      cities.push(item);
    }
  });
  var data = {
    "language": req.param('lang'),
    "timezone": req.param('tz'),
    "calendar": req.param('ical'),
    "cities": cities
  };

  fs.writeFileSync("./routes/wierzba.json", JSON.stringify(data, null, 4));
  res.render('config', data);
}


module.exports = setup;
