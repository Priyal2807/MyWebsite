$( document ).ready(function() {
    $('img').addClass('myImg');
});
$(function(){
  $('.main-menu').mouseover(function(){
    $('.mainWrap').css({
      'margin-left':'30vh',
      'transition':'all 0.2s',
      '-webkit-transition':'all 0.2s',
      '-webkit-transform':'translateZ(0) scale(1,1)'
  });
$('img').addClass('myImgafter');
$('img').removeClass('myImg');
  });
  $('.main-menu').mouseout(function(){
    $('.mainWrap').css({
      // 'transition':'width 5s linear ',
        'transition':'all 0.2s',
      '-webkit-transition':'all 0.2s',
      '-webkit-transform':'translateZ(0) scale(1,1)',
      'margin-left':'1vh'
  });
$('img').removeClass('myImgafter');
$('img').addClass('myImg');

  });
  // if($($(this).selector + ":hover").length > 0){
  //   alert('hello');
  //   $('.about-me').css('margin-left','40vh');
  // }
});
