$(function() {
  $('a[href^="#"].not[href^="#tabs-"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

  // $(document).ready(function(){
  //   $("#section-1 .wrap").css({
  //     'padding-top': $("#nav").height() + 30 + 'px'
  //   });
  // });   

  $(window).on('beforeunload', function(){
    $(window).scrollTop(0);
    location.reload(true);
  });

  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= $(window).height()*0.8) {
      $("#nav").addClass("fixed");
    } else {
      $("#nav").removeClass("fixed");
    }
  });

  $('#tabs a').on('click', function (event) {
    event.preventDefault();
    $('#tabs a').removeClass('active');
    $(this).parent().addClass('active');
    $('.contBox').hide();
    $($(this).attr('href')).show();
  });
  $('#tabs a:first').trigger('click'); // Default
   

  
  
  var $animation_elements = $('.bkBox');
  var $window = $(window);

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
  }


  

  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');

});