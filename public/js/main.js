var now = undefined;

var showTime = function(date){
  var seconds = now.getSeconds();
  seconds = seconds<10?'0'+seconds:seconds;
  var hours = now.getHours();
  hours = hours<10?'0'+hours:hours;
  var minutes = now.getMinutes();
  minutes = minutes<10?'0'+minutes:minutes;
  var time = hours + ':'+ minutes;
  if(date !== undefined){
    $(".date").html(date);
  }
  $('.time').html(time + '<span class="sec">'+seconds+'</span>');
}

var updateTime = function(){
  var lang = window.navigator.language;
  if ( now === undefined || now.getHours() === 0){
    $.getJSON("/time/"+lang, {}, function(json, textStatus) {
      now = new Date(json.timestamp);
      showTime(json.date);
    });
  }else{
    now = new Date();
    showTime();
  }

  setTimeout(function() {
    updateTime();
  }, 1000);
}

function roundVal(temp)
{
	return Math.round(temp-273.15);
}

function kmh2beaufort(kmh)
{
	var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
	for (var beaufort in speeds) {
		var speed = speeds[beaufort];
		if (speed > kmh) {
			return beaufort;
		}
	}
	return 12;
}


var updateWeather = function(){
	var iconTable = {
		'01d':'wi-day-sunny',
		'02d':'wi-day-cloudy',
		'03d':'wi-cloudy',
		'04d':'wi-cloudy-windy',
		'09d':'wi-showers',
		'10d':'wi-rain',
		'11d':'wi-thunderstorm',
		'13d':'wi-snow',
		'50d':'wi-fog',
		'01n':'wi-night-clear',
		'02n':'wi-night-cloudy',
		'03n':'wi-night-cloudy',
		'04n':'wi-night-cloudy',
		'09n':'wi-night-showers',
		'10n':'wi-night-rain',
		'11n':'wi-night-thunderstorm',
		'13n':'wi-night-snow',
		'50n':'wi-night-alt-cloudy-windy'
	}


	$.getJSON('/current-weather/Opole,pl', function(json, textStatus) {
    var temp = roundVal(json.main.temp);
		var wind = roundVal(json.wind.speed);
		var iconClass = iconTable[json.weather[0].icon];
		var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
    $('.temp').html(icon.clone().wrap('<p>').parent().html()+temp+'&deg;', 1000);

		var sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0,5);
		var sunset = new Date(json.sys.sunset*1000).toTimeString().substring(0,5);
		var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + kmh2beaufort(wind) ;
		var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise;
		if (json.sys.sunrise*1000 < now && json.sys.sunset*1000 > now) {
			sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset;
		}
		$('.windsun').html(windString+' '+sunString, 1000);

    $('.city').html(json.name);


    // var temp_min = roundVal(json.main.temp_min);
		// var temp_max = roundVal(json.main.temp_max);
    // var forecast = 'Min: '+temp_min+'&deg;, Max: '+temp_max+'&deg;';
		// $('.forecast').html(forecast, 1000);
	});

	setTimeout(function() {
		updateCurrentWeather();
	}, 60000);

}

var main = function(){
  // updateTime();
  updateWeather();
}

$(document).ready(main);
