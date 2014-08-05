var now = undefined;
var date = '';

var showTime = function(){
  var seconds = now.getSeconds();
  seconds = seconds<10?'0'+seconds:seconds;
  var hours = now.getHours();
  hours = hours<10?'0'+hours:hours;
  var minutes = now.getMinutes();
  minutes = minutes<10?'0'+minutes:minutes;
  var time = hours + ':'+ minutes;
  $(".date").html(date);
  $('.time').html(time + '<span class="sec">'+seconds+'</span>');
}

var updateTime = function(){
  var lang = window.navigator.language;
  if ( now === undefined || now.getHours() === 0){
    $.getJSON("/time/"+lang, {}, function(json, textStatus) {
      now = new Date(json.timestamp);
      date = json.date;
      showTime();
    });
  }else{
    now = new Date();
    showTime();
  }

  setTimeout(function() {
    updateTime();
  }, 1000);
}

var main = function(){
  updateTime();
}

$(document).ready(main);
