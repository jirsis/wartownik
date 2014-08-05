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

var updateCurrentWeather = function(){
	$.getJSON('/current-weather/Madrid,es', function(json, textStatus) {
    var temp = json.temperature;
		var wind = json.windSpeed;
		var iconClass = json.iconName;
    var sunrise = json.sunrise;
    var sunset = json.sunset;

		var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
    $('.temp').html(icon.clone().wrap('<p>').parent().html()+temp+'&deg;');

		var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + wind ;
		var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise;
		if (json.isDayLight) {
			sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset;
		}
		$('.windsun').html(windString+' '+sunString, 1000);

    $('.city').html(json.city);


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
  updateTime();
  updateCurrentWeather();
}

$(document).ready(main);
