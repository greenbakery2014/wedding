$(function () {
  var methods = {
    handleTabsFixed: function () {
      var scroll = $(window).scrollTop();
      var scroll_nav = $("#nav").innerHeight();
      var scroll_tabs = $("#tabs").innerHeight();

      var section01 = $("#section-1").innerHeight();
      var section02 = $("#section-2").length;
      var section03 = $("#section-3 .titleBox").height() - scroll_nav;
      var section04 = $("#section-4").offset().top;
      var scroll_area = section01 + $("#section-2").innerHeight();
      
  
      // situation name 1
      var situationName1 = scroll >= scroll_area + section03;
      if (situationName1) {
        $("#tabs")
          .addClass("fixed")
          .css({ "top": scroll_nav, "bottom": "auto" });
      } else {
        $("#tabs")
          .removeClass("fixed")
          .css({ "top": "", "bottom": "0", "margin": "" });
        $("#section-3 .titleBox").css({"padding-bottom": scroll_tabs});
      };
  
      // situation name 2
      var situationName2 = scroll >= section04 - scroll_nav  //  - scroll_tabs
      if (situationName2) {
        $("#tabs").removeClass("fixed")
      };
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

    handleTabScroll: function (event) {
      var anchorSpace = $("#nav").innerHeight() + $("#tabs").innerHeight();
      //smoothscroll
      $('#tabs a').on('click', function () {
        var target = this.hash;
        $target = $(target);
        
        $('html, body').stop().animate({
          'scrollTop': $target.offset().top - anchorSpace + 2
        }, 800);
        return false;
      });

      var scrollPos = $(document).scrollTop();
      $('#tabs a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));

        if ( scrollPos >= refElement.offset().top - anchorSpace
          && scrollPos <= refElement.offset().top + refElement.innerHeight() - anchorSpace) {
          $('#tabs a').removeClass("active");
          currLink.addClass("active");
        }
      });
    }
  }

  var init = function () {
    $(window).on('scroll', function () {
      methods.handleTabsFixed()
      methods.handleTabScroll()
    });
    $('a[href^="#"].not[href="#"]').on('click', methods.handleClickHash);
    // $('#tabs a').on('click', methods.handleClickTabs);
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