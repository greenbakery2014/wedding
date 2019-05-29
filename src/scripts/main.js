$(function() {
  $('a[href^="#"].not[href="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        // scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  });

  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= $(window).height()*0.8) {
      $("#nav").addClass("fixed");
    } else {
      $("#nav").removeClass("fixed");
    };
    
  $(function() {
    var scroll_area = $("#section-1").innerHeight() + $("#section-2").innerHeight();
    var scroll_nav = $("#nav.fixed").innerHeight();
    var scroll_tabs = $("#tabs").innerHeight();
    var scroll_s3Title = $("#section-3 .titleBox").height() - scroll_nav;
    var scroll_s4 = $("#section-4").innerHeight();
    var scroll = $(window).scrollTop();
    if (scroll >= scroll_area + scroll_s3Title){
      $("#tabs")
      .addClass("fixed")
      .css({ "top": scroll_nav, "bottom": "auto" });
    } else {
      $("#tabs")
      .removeClass("fixed")
      .css({ "top": "", "bottom": "0", "margin": "" });
    };
    if (scroll >= scroll_area + scroll_s4 + scroll_nav + scroll_tabs) {
      $("#tabs").removeClass("fixed")};
    }); 
  });

  $(function() {
    $('#tabs a').on('click', function (event) {
      event.preventDefault();
      $('#tabs a').removeClass('active');
      $(this).parent().addClass('active');
      $('.contBox').hide();
      $($(this).attr('href')).show();

      var tabTarget = $(this.getAttribute('href'));
      var anchorSpace = Number($("#nav.fixed").innerHeight() + $("#tabs").innerHeight());
      if( tabTarget.length ) {
        $('html, body').stop().animate({
          scrollTop: $("#contBox").offset().top - anchorSpace
        }, 500);
        return false;
      }
    });
    $('#tabs a:first').trigger('click'); // Default

  });


  var $animation_elements = $('.bkBox');
  var $window = $(window);

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.innerHeight();
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


  $(window).on('beforeunload', function(){
    $(window).scrollTop(0);
    location.reload(true);
  });
});