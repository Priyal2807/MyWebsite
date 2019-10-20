$(document).ready(function() {
  $('img').addClass('myImg');

  //counter used to display the no. of projects Completed
  $('.counter').counterUp({
    delay: 70,
    time: 1000
  });
});

//section used for side navbar when it hovered and un-hovered
$(function() {
  $('.main-menu').mouseover(function() {
    $('.mainWrap').css({
      'margin-left': '30vh',
      'transition': 'all 0.2s',
      '-webkit-transition': 'all 0.2s',
      '-webkit-transform': 'translateZ(0) scale(1,1)'
    });
    $('.formStyle ,.contactSlide').css({
      'margin-left': '40vh',
      'transition': 'all 0.2s',
      '-webkit-transition': 'all 0.2s',
      '-webkit-transform': 'translateZ(0) scale(1,1)'
    });
    $('img').addClass('myImgafter');
    $('img').removeClass('myImg');
  });
  $('.main-menu').mouseout(function() {
    $('.mainWrap').css({
      // 'transition':'width 5s linear ',
      'transition': 'all 0.2s',
      '-webkit-transition': 'all 0.2s',
      '-webkit-transform': 'translateZ(0) scale(1,1)',
      'margin-left': '1vh'
    });
    $('.formStyle ,.contactSlide').css({
      'margin-left': '20vh',
      'transition': 'all 0.2s',
      '-webkit-transition': 'all 0.2s',
      '-webkit-transform': 'translateZ(0) scale(1,1)'
    });
    $('img').removeClass('myImgafter');
    $('img').addClass('myImg');

  });


});

//for project slideshow
$(function() {
  $('.projectSlideShow > div:gt(0)').hide();
  $('.projectEmpty').append($('.project1').html()).show();
  var count = 0;

  function slideshow() {
    if (count === 5) {
      $('.projectEmpty').empty();
      $('.projectEmpty').append($('.project1').html()).show();
      $('.project1').addClass('active');
      count = 0;
    } else {
      var activeSlide = $('.projectSlideShow').find('.active');
      $('.projectEmpty').empty();
      $('.projectEmpty').append(activeSlide.next().html()).show();
      if (count != 4) {
        $('.projectSlideShow').find('.active').next().addClass('active');
      }

      activeSlide.removeClass('active').hide();

      count++;
    }

  }

  function cinterval() {
    initList = setInterval(slideshow, 3000);
  }
  $('.projectSlideShow').mouseover(function() {
    clearInterval(initList);
  }).mouseout(function() {
    cinterval();

  });
  cinterval();

  //
  // setInterval(slideshow,3000);

});

// jquery for the li of projectSlideShow

$(function() {
  $('.slideButtons > li:first').css('background', 'yellow');
  var c = 0;

  function slideshowLi() {
    if (c === 5) {
      var activeLi = $('.slideButtons').find('.active');
      activeLi.removeClass('active');
      activeLi.css('background', 'white');
      $('.slideButtons > li:first').css('background', 'yellow').addClass('active');
      c = 0;
    } else {
      var activeLi = $('.slideButtons').find('.active');
      activeLi.css('background', 'white');
      activeLi.next().css('background', 'yellow');
      if (c != 5) {
        activeLi.next().addClass('active');
      }


      activeLi.removeClass('active');

      c++;
    }
  }

  function liinterval() {
    initList1 = setInterval(slideshowLi, 3000);
  }
  $('.projectSlideShow').mouseover(function() {
    clearInterval(initList1);
  }).mouseout(function() {
    liinterval();

  });
  liinterval();



});