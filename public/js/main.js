var updateTime = function(){
  var now = new Date();

  var date = '';
  var day = '';
  var month = '';
  var lang = window.navigator.language;
  console.log(lang);
  if ( now.getMinutes() === 0 ){
    $.getJSON("/time/"+lang, {}, function(json, textStatus) {
      now = new Date(json.time);
      date = json.date;
    });
  }


  $(".date").html(date);
  // $(".time").html(now.toTimeString().substring(0,5) + "<span class="sec">"+now.toTimeString().substring(6,8)+"</span>");

  setTimeout(function() {
    updateTime();
  }, 1000);
}

var main = function(){
  console.log(window.navigator.language);
  // updateTime();
}
