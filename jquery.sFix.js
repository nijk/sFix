;
(function ($){
  $.fn.sFix = function (options){

    var defaults = {
      start: options.start || 0,
      end: options.end || 0,
      resizeEvent: options.resizeEvent || 'resize'
    }

    var sf = this;
    sf.props = {};

    var init = function (){
      //Create properties settings
      sf.props = $.extend({}, defaults, options);
      //Setup methods callbacks
      manipulateDOM();
      setVpHVal();
      //Alters the values passed to the plugin to account for the viewport height
      setStartEndVals();
      setScrollVal();
      resizeListener();
      //console.log(sf.props);
      addScrollListener();
    }

    /**
     * Public methods
     */
    /*sf.destroy = function(){
     // code goes here
     }*/

    /**
     * Private methods
     */
    var manipulateDOM = function (){
      sf.wrap('<div class="sticky-holder"/>').wrap('<div class="sticky-wrapper"/>');
      sf.wrapper = sf.closest('.sticky-wrapper');
      sf.closest('.sticky-holder').height(sf.outerHeight(true));
    }

    var setVpHVal = function (){
      sf.vpH = $(window).height();
    }

    var setStartEndVals = function (){
      sf.props.start = options.start - sf.vpH;
      sf.props.end = options.end - sf.vpH;
    }

    var setScrollVal = function (){
      sf.scroll = $(document).scrollTop();
    }

    var resizeListener = function (){
      //todo: this needs to accept debounced listeners if they exist
      $(window).on(sf.props.resizeEvent, function (){
        setVpHVal();
        setStartEndVals();
        //setScrollVal();
        $(window).off('scroll.sFix');
        addScrollListener();
      });
    }

    var handleClasses = function (){
      if(sf.scroll > sf.props.start && sf.scroll < sf.props.end){
        sf.wrapper.addClass('stuck');
        $('body').trigger('sFix.stuck');
      }else{
        if(sf.wrapper.hasClass('stuck')){
          sf.wrapper.removeClass('stuck');
          $('body').trigger('sFix.unstuck');
        }
      }
    }

    var addScrollListener = function (){
      $(window).on('scroll.sFix', function (){
        setScrollVal();
        handleClasses();
      });
    }

    return this.each(function (i, options){
      init();
    });
  }
})(jQuery);