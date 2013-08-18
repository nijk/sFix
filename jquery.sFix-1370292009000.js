(function($){$.fn.sFix=function(options){var defaults={start:options.start||0,end:options.end||0,resizeEvent:options.resizeEvent||"resize"};var sf=this;sf.props={};var init=function(){sf.props=$.extend({},defaults,options);manipulateDOM();setVpHVal();setStartEndVals();setScrollVal();resizeListener();addScrollListener();};var manipulateDOM=function(){sf.wrap('<div class="sticky-holder"/>').wrap('<div class="sticky-wrapper"/>');sf.wrapper=sf.closest(".sticky-wrapper");sf.height=sf.outerHeight(true);sf.closest(".sticky-holder").css({height:sf.height,margin:sf.css("margin")});};var setVpHVal=function(){sf.vpH=$(window).height();};var setStartEndVals=function(){sf.props.start=(options.start-sf.vpH);sf.props.end=options.end-sf.vpH;};var setScrollVal=function(){sf.scroll=$(document).scrollTop();};var resizeListener=function(){$(window).on(sf.props.resizeEvent,function(){setVpHVal();setStartEndVals();$(window).off("scroll.sFix");addScrollListener();});};var handleClasses=function(){var inZone=(sf.scroll>=sf.props.start&&sf.scroll<=sf.props.end)?true:false,isStuck=sf.wrapper.hasClass("stuck");if(inZone&&!isStuck){inZone=true;sf.wrapper.addClass("stuck");sf.css({bottom:0-sf.height}).animate({bottom:"0"},200,function(){sf.trigger("sFix.stuck");});}else{if(!inZone&&isStuck){var pos="start";if(sf.scroll>=sf.props.end){pos="end";}if(pos==="start"){sf.animate({bottom:0-sf.height},200,function(){sf.wrapper.removeClass("stuck");});}else{sf.wrapper.removeClass("stuck");}sf.trigger("sFix.unstuck-"+pos);}}};var addScrollListener=function(){$(window).on("scroll.sFix",function(){setScrollVal();handleClasses();});};return this.each(function(i,options){init();});};})(jQuery);