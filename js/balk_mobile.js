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
      $('#zone-header ul.menu').toggle();
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
  
  function mobile_disable(){
    $('#mobile-menu').remove();
    $('#zone-footer ul.menu').remove();
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
    }
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
          $(".front .pane-news .pane-content").hide();
      });
    }
}(jQuery));
