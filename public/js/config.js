var main = function(){
  $('.new-city').focusout(function(){
    var oldClass=$(this).attr('class');

    if($(this).val().length === 0){
      $(this).remove();
    }else{
      $(this).removeClass(oldClass).addClass($(this).val());
    }
  });
  $('.new-city').focusin(function(){
    $('.cities').append('<input type="text" placeholder="Madrid,es" class="new-city">');
  });
}

$(document).ready(main);
