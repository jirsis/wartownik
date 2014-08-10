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
    $('.date').html(date);
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

var updateWeather = function(){
  updateCurrentWeather();
  updateNextWeather();
  setTimeout(function() {
    updateWeather();
  }, 10000);

}

var updateCurrentWeather = function(){
	$.getJSON('/current-weather', function(json, textStatus) {
    var temp = json.temperature;
		var wind = json.windSpeed;
		var iconClass = json.iconName;
    var sunrise = json.sunrise;
    var sunset = json.sunset;

		var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
		var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + wind ;
		var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise;
		if (json.isDayLight) {
			sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset;
		}

    $('.temp').hide().html(icon.clone().wrap('<p>').parent().html()+temp+'&deg;').fadeIn(700);
		$('.windsun').hide().html(windString+' '+sunString).fadeIn(700);
    $('.city').hide().html(json.city).fadeIn(700);
	});
}

var updateNextWeather = function(){
  $.getJSON('/next-weather', function(json, textStatus) {
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
    $('.forecast').hide().html(forecastTable).fadeIn(700);
	});
}

var updateCalendar = function(){
  $.getJSON('/calendar', function(json, textStatus) {
    var calendarData = {};
    var calendarTable = $('<table />').addClass('calendar-table');
    var opacity = 1;
    for (var i in json.calendar) {
      var meeting = json.calendar[i];
      var row = $('<tr />').css('opacity', opacity);
      row.append($('<td/>').addClass('day').html(meeting.start));
      row.append($('<td/>').addClass('title').html(meeting.summary));

      calendarTable.append(row);
      opacity -= 0.10;
    }
    $('.calendar').html(calendarTable);
  });

  setTimeout(function() {
     updateCalendar();
  }, 3600000);
}

var updateNews = function(){
  $.getJSON('/news', function(json, textStatus) {
    $('.news').hide().text(json.title).fadeIn(700);
    $('.abstract').hide().html(json.abstract).fadeIn(700);

    setTimeout(function() {
      console.log("update news");
    	updateNews(false);
    }, 10000);
  });
}

var main = function(){
  updateTime();
  updateNews();
  updateCalendar();
  updateWeather();
}

$(document).ready(main);
