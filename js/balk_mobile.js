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
    $($region_header_first).insertBefore('#region-footer-first');


    
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
  }

  Drupal.behaviors.BalkMobile = {
    attach: function(context, settings) {
      if(mobile_width($(window).width())){
        mobile_setup();
      }
     }
  };

  $(window).resize(function() {
    if(mobile_width($(window).width())){
      if($('#mobile-menu').length === 0){
        mobile_setup();
      }
    }
    else {
      mobile_disable();
    }
  }); 

}(jQuery));
