(function($){
  function mobile_width(width){
    if(width < 739){
      return true;

    }
    return false;
  }

  function mobile_setup(){
    $('<div id="mobile-menu">Menu</div>').insertBefore('#region-menu');
    $region_header_first = $('#region-header-first').html();
    $($region_header_first).insertBefore('#region-footer-second');

    $('#zone-header ul.menu').hide();

        $('#mobile-menu').bind("click", function(event){
      $('.mobile_main_menu ul.menu').toggle();
    });

    $('.region-menu ul.menu > li').unbind('mouseenter');
    $('.expanded a').bind("click", function(event){
      $submenu = $(this).parent().find('.submenu');

      if($submenu.is(':visible')){
        $submenu.hide();
      }
      else {
        $submenu.show();
      }
    });

  }
  function mobile_menu(){
    $('.not-front .mobile_main_menu ul.menu').hide();

    $('.mobile-menu').bind("click", function(event){
      $('.mobile_main_menu ul.menu').toggle();
    });

    $('.mobile_main_menu li.l1').bind("click", function(event){
      $submenu = $(this).find('.submenu');

      if($submenu.is(':visible')){
        $submenu.hide();
        var path = $(this).css("background-image");
        path = path.replace('open', 'close');
        $(this).css({
           'background-image': path,
        });      }
      else {
        $submenu.show();
        var path = $(this).css("background-image");
        path = path.replace('close', 'open');
        $(this).css({
           'background-image': path,
        });
      }
    });
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
        mobile_menu();
      }
     }
  };

  $(window).resize(function() {
    if(mobile_width($(window).width())){
      if($('#mobile-menu').length === 0){
        mobile_setup();
        mobile_news();
        mobile_menu();
      }
    }
    else {
      mobile_disable();
      $(".front .pane-news h2.pane-title").click(function() {
        $(".front .pane-news .pane-content").show();
      });
    }
    // weird bug
    $('#block-menu-block-11 ul.menu ul.menu').css({'display' : ''});
  });

   function mobile_news() {
      $(".front .pane-news .pane-content").hide();
      $(".front .pane-news h2.pane-title").click(function() {
        var style= $(".front .pane-news .pane-content").css('display');
        if (style === 'none') {
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
