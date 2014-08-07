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
  if ( now === undefined || now.getHours() === 0){
    $.getJSON("/time", {}, function(json, textStatus) {
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
	});

	setTimeout(function() {
		updateCurrentWeather();
	}, 60000);

}

var updateNextWeather = function(){

  $.getJSON('/next-weather/Madrid,es', function(json, textStatus) {

			var forecastData = {};
      var forecastTable = $('<table />').addClass('forecast-table');
      var opacity = 1;
      for (var i in json.weather16) {
			 	var forecast = json.weather16[i];
        var row = $('<tr />').css('opacity', opacity);
        row.append($('<td/>').addClass('day').html(forecast.day));
        row.append($('<td/>').addClass('temp-max').html(forecast.temp.max));
        row.append($('<td/>').addClass('temp-min').html(forecast.temp.min));

        forecastTable.append(row);
        opacity -= 0.155;
      }
      $('.forecast').html(forecastTable, 1000);
		});


		setTimeout(function() {
		 	updateWeatherForecast();
		}, 60000);

}

var updateNews = function(){
  $.getJSON('/news', function(json, textStatus) {
    $('.news').text(json.title);
    $('.abstract').html(json.abstract);

    setTimeout(function() {
      console.log("update news");
    	updateNews(false);
    }, 10000);
  });
}

var main = function(){
  updateTime();
  updateCurrentWeather();
  updateNextWeather();
  updateNews();
}

$(document).ready(main);
