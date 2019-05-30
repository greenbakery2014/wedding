$(function () {
  var methods = {
    handleNavFixed: function () {
      var scroll = $(window).scrollTop();
      var scrollNav = $("#nav").innerHeight();
      var scrollTarget = scroll >= $("#section-2").offset().top - scrollNav
  
      if (scrollTarget) {
        $("#nav").addClass("fixed");
      } else {
        $("#nav").removeClass("fixed");
      };
    },
    handleTabsFixed: function () {
      var scroll = $(window).scrollTop();
      var scroll_area = $("#section-1").innerHeight() + $("#section-2").innerHeight();
      var scroll_nav = $("#nav.fixed").innerHeight();
      var scroll_tabs = $("#tabs").innerHeight();
      var scroll_s3Title = $("#section-3 .titleBox").height() - scroll_nav;
      var scroll_s4Top = $("#section-4").offset().top;
  
      // situation name 1
      var situationName1 = scroll >= scroll_area + scroll_s3Title
      if (situationName1) {
        $("#tabs")
          .addClass("fixed")
          .css({ "top": scroll_nav, "bottom": "auto" });
      } else {
        $("#tabs")
          .removeClass("fixed")
          .css({ "top": "", "bottom": "0", "margin": "" });
      };
  
      // situation name 2
      var situationName2 = scroll >= scroll_s4Top - scroll_nav - scroll_tabs
      if (situationName2) {
        $("#tabs").removeClass("fixed")
      };
    },
    handleElementsInView: function ($elements) {
      var window_height = $(window).height();
      var window_top_position = $(window).scrollTop();
      var window_bottom_position = window_top_position + window_height;
  
      $.each($elements, function () {
        var $element = $(this);
        var element_height = $element.innerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = element_top_position + element_height;
  
        // check to see if this current container is within viewport
        if (
          (element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)
        ) {
          $element.addClass('in-view');
        } else {
          $element.removeClass('in-view');
        }
      });
    },
    handleClickHash: function (event) {
      var target = $(this.getAttribute('href'));
  
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          // scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    },
    handleClickTabs: function (event) {
      event.preventDefault();
  
      $('#tabs a').removeClass('active');
      $(this).addClass('active');
      $('.contBox').hide();
      $($(this).attr('href')).fadeIn(300);

      var tabTarget = $(this.getAttribute('href'));
      var anchorSpace = Number($("#nav.fixed").innerHeight() + $("#tabs").innerHeight());
      if (tabTarget.length) {
        $('html, body').stop().animate({
          scrollTop: $("#contBox").offset().top - anchorSpace
        }, 500);
        return false;
      }
    }
  }

  var init = function () {
    $(window).on('scroll', function () {
      methods.handleNavFixed()
      methods.handleTabsFixed()
    });
    $(window).on('scroll resize', function () {
      methods.handleElementsInView($('.bkBox'))
    });
    $('a[href^="#"].not[href="#"]').on('click', methods.handleClickHash);
    $('#tabs a').on('click', methods.handleClickTabs);
  }

  var beforeunload = function () {
    $(window).on('beforeunload', function () {
      $(window).scrollTop(0);
      location.reload(true);
    });
  }

  init()
  beforeunload()
});