var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function ($) {

  // MyRisk form validation setup.
  var $resultsForm = $("form[name=myrisk-results-email]");

  $resultsForm.validate({
    ignore: [],
    onchange: true,
    rules: {
      email: {
        requiredField: true,
        emailFormat: true,
        email: false // stop jquery from validating field
      }
    },
    messages: {
      email: {
        requiredField: "This is a required field",
        emailFormat: "Please enter a valid email address"
      }
    },
    errorPlacement: function (error, $el) {
      error.insertAfter($el);
    }
  });

  // Listeners...
  $(function () {
    // Init bobble tween.
    var bobbleTween = TweenMax.fromTo("#myrisk-next", .5, {
      xPercent: 5
    }, {
      xPercent: 0,
      yoyo: true,
      repeat: -1
    });

    $(document).on("slid.bs.carousel", "#myrisk", function () {
      // Kill bobble tween.
      bobbleTween.kill();
      TweenMax.set("#myrisk-next", {x: 0});
    });

    // Initial slide chevron.
    $('#myrisk .scene1 .scroll-down').on('click', function () {
      var toScroll = $(this).closest('#myrisk').offset().top + 700;
      //$("html,body").animate({scrollTop:$(".ra-wheel").offset().top});
      scrollMagicController.scrollTo(toScroll);
    });

    // Disable next/prev arrows (or any .disabled) on older versions of IE.
    $(document).on('click', '#myrisk .disabled', function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  });

})(jQuery);


}
/*
     FILE ARCHIVED ON 06:14:35 Feb 26, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:28:44 Apr 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.656
  exclusion.robots: 0.024
  exclusion.robots.policy: 0.01
  esindex: 0.011
  cdx.remote: 7.247
  LoadShardBlock: 88.4 (3)
  PetaboxLoader3.datanode: 126.7 (5)
  load_resource: 177.959 (2)
  PetaboxLoader3.resolve: 95.049 (2)
*/