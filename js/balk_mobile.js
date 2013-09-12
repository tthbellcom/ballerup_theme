(function($){
  function mobile_width(width){
    if(width < 728){
      return true;

    }
    return false;
  }

  function mobile_setup(){
    $('<div id="mobile-menu"></div>').insertBefore('#region-menu');
    $region_header_first = $('#region-header-first').html();
    $($region_header_first).insertBefore('#region-footer-second');

    $('.not-front .mobile_main_menu ul.menu').hide();
    $('.mobile_main_menu .submenu').hide();

    $('#mobile-menu').bind("click", function(event){
      $('.block-panels-mini-balk-mobile-menu').toggle();
    });

    $('ul.menu li').click(function() {
      $(this).children().addClass('task-bg-color');
    });

    $('.block-panels-mini-balk-mobile-menu .pane-menu-forsidegenveje .pane-title').bind("click", function(event){
      $(this).parent().find('.pane-content').toggle();
      $(this).toggleClass('task-bg-color');
    });


     jQuery('#zone-header').prepend('<div class="mobile-header"><a href="/"></a></div>');
  }

  function mobile_disable(){
    $('#mobile-menu').remove();
    $('#zone-footer .region-header-first-inner').remove();
    $('#zone-header ul.menu').show();
    Drupal.behaviors.BalkMainMenu.attach();
    $(".front .pane-news .pane-content").show();
    // $(".front .pane-news h2.pane-title").css({'background': 'none',});
  }

  Drupal.behaviors.BalkMobile = {
    attach: function(context, settings) {
      if(mobile_width($(window).width())){
        mobile_setup();
        mobile_news();
      }
     }
  };

  $(window).resize(function() {
    if(mobile_width($(window).width())){
      if($('#mobile-menu').length === 0){
        mobile_setup();
        mobile_news();
      }
    }
    else {
      mobile_disable();
      $(".front .pane-news h2.pane-title").unbind('click');
    }
    // weird bug
    $('#block-menu-block-11 ul.menu ul.menu').css({'display' : ''});
  });

   function mobile_news() {
      $(".front .pane-news .pane-content").hide();
      $(".front .pane-news h2.pane-title").click(function() {
        var style= $(".front .pane-news .pane-content").css('display');
        if (style == 'none') {
          $(".front .pane-news .pane-content").show();
         // $(".front .pane-news h2.pane-title").css({
           //  'background': "url('/profiles/os2web/themes/balk/images/sprite-bg-main-menu-arrows.png') no-repeat",
            //  'background-position': '90% -227px',
          //});
        }
        else
        {
          $(".front .pane-news .pane-content").hide();
        }
      });
    }
}(jQuery));
