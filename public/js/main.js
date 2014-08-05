
var showTime = function(now, date){
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
  var now;
  if ( now === undefined || now.getHours() === 0){
    $.getJSON("/time/"+lang, {}, function(json, textStatus) {
      now = new Date(json.timestamp);
      showTime(now, json.date);
    });
  }else{
    now = new Date();
    showTime(now);
  }

  setTimeout(function() {
    updateTime();
  }, 1000);
}

var main = function(){
  updateTime();
}

$(document).ready(main);
